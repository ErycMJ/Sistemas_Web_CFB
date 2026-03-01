export const createInitialTransactionFormData = () => ({
  type: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
  amount: "",
  currency: "BRL",
  recurrence: "never",
  end: "",
  remind: "",
  photo: null,
  transferTo: "",
  transferFrom: "",
})

export const TRANSACTION_TYPE_OPTIONS = [
  { value: "", label: "Selecione" },
  { value: "expense", label: "Despesa" },
  { value: "income", label: "Receita" },
]

export const CURRENCY_OPTIONS = [
  { value: "BRL", label: "BRL" },
  { value: "USD", label: "USD" },
]

export const RECURRENCE_OPTIONS = [
  { value: "never", label: "Nunca" },
  { value: "oneD", label: "Um dia" },
  { value: "twoD", label: "Dois dias" },
  { value: "workD", label: "Dias úteis" },
  { value: "oneW", label: "Uma semana" },
  { value: "twoW", label: "Duas semanas" },
  { value: "fourW", label: "Quatro semanas" },
  { value: "oneM", label: "Um mês" },
  { value: "twoM", label: "Dois meses" },
  { value: "threeM", label: "Três meses" },
  { value: "sixM", label: "Seis meses" },
  { value: "oneY", label: "Um ano" },
]
