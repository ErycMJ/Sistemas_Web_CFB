import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import string from "../../String"
import { updateUser } from "../../Redux/User/userSlice"
import { getApiErrorMessage } from "../../components/Private/transactionApi"

const IMPORT_TEMPLATE_HEADERS = ["descricao", "valor", "data", "categoria", "moeda"]

const TEMPLATE_PREVIEW_ROWS = [
  {
    descricao: "Supermercado",
    valor: "150,90",
    data: "15/02/2026",
    categoria: "Alimentação",
    moeda: "BRL",
  },
  {
    descricao: "Salário",
    valor: "4200,00",
    data: "05/02/2026",
    categoria: "Salário",
    moeda: "BRL",
  },
]

const TEMPLATE_TEXT = [
  "descricao;valor;data;categoria;moeda",
  "Supermercado;150,90;15/02/2026;Alimentação;BRL",
  "Salário;4200,00;05/02/2026;Salário;BRL",
].join("\n")

const normalizeText = (value = "") =>
  String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()

const normalizeColumnName = (value) => normalizeText(value).replace(/\s+/g, "")

const detectSeparator = (headerLine) => {
  if (headerLine.includes(";")) return ";"
  if (headerLine.includes(",")) return ","
  if (headerLine.includes("\t")) return "\t"
  return ";"
}

const parseAmountValue = (value) => {
  if (value === null || value === undefined) {
    return null
  }

  const normalized = String(value)
    .replace(/R\$|\s/g, "")
    .replace(/\.(?=\d{3}(\D|$))/g, "")
    .replace(",", ".")

  const amount = Number(normalized)
  if (!Number.isFinite(amount) || amount <= 0) {
    return null
  }

  return amount
}

const parseDateValue = (value) => {
  if (!value) {
    return null
  }

  const raw = String(value).trim()

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [day, month, year] = raw.split("/")
    const parsed = new Date(`${year}-${month}-${day}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().split("T")[0]
  }

  if (/^\d{8}$/.test(raw)) {
    const year = raw.slice(0, 4)
    const month = raw.slice(4, 6)
    const day = raw.slice(6, 8)
    const parsed = new Date(`${year}-${month}-${day}T00:00:00`)
    return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString().split("T")[0]
  }

  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }

  return parsed.toISOString().split("T")[0]
}

const mapRowFromValues = (values, indices) => ({
  descricao: values[indices.descriptionIndex] || "",
  valor: values[indices.amountIndex] || "",
  data: values[indices.dateIndex] || "",
  categoria: indices.categoryIndex >= 0 ? values[indices.categoryIndex] || "" : "",
  moeda: indices.currencyIndex >= 0 ? values[indices.currencyIndex] || "BRL" : "BRL",
})

const resolveColumnIndices = (headerColumns) => ({
  descriptionIndex: headerColumns.findIndex((column) =>
    ["descricao", "description", "nota", "note"].includes(column)
  ),
  amountIndex: headerColumns.findIndex((column) =>
    ["valor", "amount", "quantia"].includes(column)
  ),
  dateIndex: headerColumns.findIndex((column) => ["data", "date", "dt"].includes(column)),
  categoryIndex: headerColumns.findIndex((column) =>
    ["categoria", "category"].includes(column)
  ),
  currencyIndex: headerColumns.findIndex((column) => ["moeda", "currency"].includes(column)),
})

const parseDelimitedRows = (rawData) => {
  const lines = rawData
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)

  if (!lines.length) {
    return []
  }

  const separator = detectSeparator(lines[0])
  const headerColumns = lines[0].split(separator).map((column) => normalizeColumnName(column))
  const indices = resolveColumnIndices(headerColumns)
  const hasHeader =
    indices.descriptionIndex >= 0 && indices.amountIndex >= 0 && indices.dateIndex >= 0

  const rows = []

  if (hasHeader) {
    for (let index = 1; index < lines.length; index += 1) {
      const values = lines[index].split(separator).map((item) => item.trim())
      rows.push(mapRowFromValues(values, indices))
    }
    return rows
  }

  for (const line of lines) {
    const values = line.split(separator).map((item) => item.trim())
    rows.push({
      descricao: values[0] || "",
      valor: values[1] || "",
      data: values[2] || "",
      categoria: values[3] || "",
      moeda: values[4] || "BRL",
    })
  }

  return rows
}

const findCategoryByDescription = (description, categories) => {
  const normalizedDescription = normalizeText(description)

  for (const category of categories) {
    const normalizedCategoryName = normalizeText(category.categoryName)
    if (normalizedCategoryName && normalizedDescription.includes(normalizedCategoryName)) {
      return category
    }
  }

  return null
}

const findCategoryByLabel = (label, categories) => {
  const normalizedLabel = normalizeText(label)
  if (!normalizedLabel) {
    return null
  }

  return categories.find((category) => normalizeText(category.categoryName) === normalizedLabel) || null
}

const mapRowsToTransactions = ({ rows, transactionType, categories, defaultCategoryId }) => {
  const transactions = []
  const errorLines = []

  rows.forEach((row, index) => {
    const amount = parseAmountValue(row.valor)
    const date = parseDateValue(row.data)
    const note = String(row.descricao || "").trim()

    const categoryFromFile = findCategoryByLabel(row.categoria, categories)
    const categoryByDescription = findCategoryByDescription(note, categories)

    const categoryId = categoryFromFile?._id || categoryByDescription?._id || defaultCategoryId

    if (!note || !amount || !date || !categoryId) {
      errorLines.push(index + 1)
      return
    }

    transactions.push({
      type: transactionType,
      category: categoryId,
      note,
      amount,
      currency: String(row.moeda || "BRL").toUpperCase(),
      date,
    })
  })

  return { transactions, errorLines }
}

export const useProfile = () => {
  const dispatch = useDispatch()
  const { currentUser } = useSelector((state) => state.user)

  const [username, setUsername] = useState(currentUser?.user?.username || "")
  const [transactionData, setTransactionData] = useState("")
  const [transactionType, setTransactionType] = useState("income")
  const [categories, setCategories] = useState([])
  const [importCategory, setImportCategory] = useState("")
  const [importPreview, setImportPreview] = useState([])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get(`${string}/category/getCategory`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })

        const filteredCategories = data.filter(
          (category) => category.categoryType === transactionType
        )

        setCategories(filteredCategories)

        setImportCategory((previous) => {
          if (previous && filteredCategories.some((category) => category._id === previous)) {
            return previous
          }
          return filteredCategories[0]?._id || ""
        })
      } catch (error) {
        toast.error(getApiErrorMessage(error, "Erro ao carregar categorias."))
      }
    }

    loadCategories()
  }, [transactionType])

  const buildPreviewFromRows = (rows) => {
    const { transactions, errorLines } = mapRowsToTransactions({
      rows,
      transactionType,
      categories,
      defaultCategoryId: importCategory,
    })

    if (errorLines.length) {
      toast.error(`Linhas inválidas na visualização: ${errorLines.join(", ")}`)
    }

    setImportPreview(transactions)
    return transactions
  }

  const handleUpdateProfileDetails = async () => {
    try {
      const { data } = await axios.put(
        `${string}/user/updateprofile`,
        { username },
        {
          withCredentials: true,
        }
      )

      dispatch(updateUser(data))
      toast.success(data.message)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao atualizar perfil."))
    }
  }

  const handleImportTransactions = async () => {
    let transactionsToImport = importPreview

    if (!transactionsToImport.length) {
      if (!transactionData.trim()) {
        toast.error("Cole os dados ou envie um arquivo antes de importar.")
        return
      }

      const rows = parseDelimitedRows(transactionData)
      transactionsToImport = buildPreviewFromRows(rows)
    }

    if (!transactionsToImport.length) {
      toast.error("Nenhuma transação válida encontrada para importação.")
      return
    }

    try {
      const { data } = await axios.post(
        `${string}/transaction/import`,
        { transactions: transactionsToImport },
        {
          withCredentials: true,
        }
      )

      toast.success(data.message)
      setTransactionData("")
      setImportPreview([])
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Erro ao importar transações."))
    }
  }

  const handleImportFile = async (event) => {
    const file = event.target.files?.[0]

    if (!file) {
      return
    }

    const lowerName = file.name.toLowerCase()

    try {
      let rows = []

      if (lowerName.endsWith(".csv") || lowerName.endsWith(".txt")) {
        const content = await file.text()
        setTransactionData(content)
        rows = parseDelimitedRows(content)
      } else {
        toast.error("Formato inválido. Use apenas arquivos .csv ou .txt")
        return
      }

      const preview = buildPreviewFromRows(rows)

      if (!preview.length) {
        toast.error("Não foi possível gerar visualização com os dados do arquivo.")
        return
      }

      toast.success(`Arquivo carregado com ${preview.length} transações na visualização.`)
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Falha ao processar arquivo de importação."))
    }
  }

  const templatePreviewHeaders = useMemo(() => IMPORT_TEMPLATE_HEADERS, [])

  return {
    username,
    setUsername,
    transactionData,
    setTransactionData,
    transactionType,
    setTransactionType,
    categories,
    importCategory,
    setImportCategory,
    importPreview,
    setImportPreview,
    handleImportFile,
    templatePreviewHeaders,
    templatePreviewRows: TEMPLATE_PREVIEW_ROWS,
    importTemplateText: TEMPLATE_TEXT,
    handleUpdateProfileDetails,
    handleImportTransactions,
  }
}
