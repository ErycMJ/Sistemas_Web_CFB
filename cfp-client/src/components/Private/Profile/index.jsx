import { useProfile } from "../../../hooks/private";
import Button from "../../../shared/utils/Button";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import { PrivateCard, PrivateInput, PrivatePageContainer, PrivateSelect } from "./style";

export function Profile() {
  const {
    username,
    setUsername,
    transactionData,
    setTransactionData,
    transactionType,
    setTransactionType,
    categories,
    importCategory,
    setImportCategory,
    handleImportFile,
    templatePreviewHeaders,
    templatePreviewRows,
    importTemplateText,
    importPreview,
    setImportPreview,
    handleUpdateProfileDetails,
    handleImportTransactions,
  } = useProfile();

  return (
    <PrivatePageContainer css={{ maxWidth: "36rem" }}>
      <PrivateCard>
        <TitleContainer css={{ textAlign: "center", marginBottom: "1.25rem" }}>Perfil</TitleContainer>
        <div className="profile-details-update">
          <div className="mb-5">
            <SubTitleContainer css={{ display: "block", color: "#065F46", marginBottom: "0.5rem" }}>
              Nome de usuário
            </SubTitleContainer>
            <PrivateInput type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
          </div>
          <div className="flex justify-center mb-3">
            <Button onClick={handleUpdateProfileDetails} text="Atualizar perfil" type="greenButton" />
          </div>
        </div>

        <div className="import-transactions mt-10">
          <SubTitleContainer
            css={{
              display: "block",
              fontSize: "1.75rem",
              color: "#065F46",
              textAlign: "center",
              marginBottom: "1.25rem",
            }}
          >
            Importar transações
          </SubTitleContainer>

          <div className="transaction-type-selector mb-5">
            <SubTitleContainer css={{ display: "block", color: "#065F46", marginBottom: "0.5rem" }}>
              Tipo de transação
            </SubTitleContainer>
            <PrivateSelect value={transactionType} onChange={(event) => setTransactionType(event.target.value)}>
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </PrivateSelect>
          </div>

          <div className="transaction-type-selector mb-5">
            <SubTitleContainer css={{ display: "block", color: "#065F46", marginBottom: "0.5rem" }}>
              Categoria para importação
            </SubTitleContainer>
            <PrivateSelect value={importCategory} onChange={(event) => setImportCategory(event.target.value)}>
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </PrivateSelect>
          </div>

          <div className="mb-5">
            <SubTitleContainer css={{ display: "block", color: "#065F46", marginBottom: "0.5rem" }}>
              Arquivo de importação (.csv ou .txt)
            </SubTitleContainer>
            <PrivateInput type="file" accept=".csv,.txt" onChange={handleImportFile} css={{ backgroundColor: "#ffffff" }} />
          </div>

          <div className="mb-5 p-3 bg-white rounded-md border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-green-800">Modelo CSV (visualização)</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => setTransactionData(importTemplateText)}
                  className="text-sm bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-600"
                >
                  Usar modelo de exemplo
                </button>
                <button
                  onClick={() => setImportPreview([])}
                  className="text-sm bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-400"
                >
                  Limpar visualização
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border border-gray-200">
                <thead className="bg-green-100 text-green-900">
                  <tr>
                    {templatePreviewHeaders.map((header) => (
                      <th key={header} className="px-3 py-2 border-b border-gray-200">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {templatePreviewRows.map((row, rowIndex) => (
                    <tr key={`preview-row-${rowIndex}`} className="bg-white">
                      {templatePreviewHeaders.map((header) => (
                        <td key={`${header}-${rowIndex}`} className="px-3 py-2 border-b border-gray-100">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {importPreview.length > 0 && (
            <div className="mb-5 p-3 bg-white rounded-md border border-green-200">
              <h4 className="text-lg font-semibold text-green-800 mb-2">
                Visualização de transações detectadas ({importPreview.length})
              </h4>
              <p className="text-xs text-gray-600 mb-2">
                Conciliação automática aplicada por nome de categoria no texto da descrição.
              </p>
              <div className="overflow-x-auto max-h-64">
                <table className="w-full text-sm text-left border border-gray-200">
                  <thead className="bg-green-100 text-green-900 sticky top-0">
                    <tr>
                      <th className="px-3 py-2 border-b border-gray-200">Descrição</th>
                      <th className="px-3 py-2 border-b border-gray-200">Valor</th>
                      <th className="px-3 py-2 border-b border-gray-200">Data</th>
                      <th className="px-3 py-2 border-b border-gray-200">Moeda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {importPreview.slice(0, 50).map((item, index) => (
                      <tr key={`import-preview-${index}`} className="bg-white">
                        <td className="px-3 py-2 border-b border-gray-100">{item.note}</td>
                        <td className="px-3 py-2 border-b border-gray-100">{item.amount}</td>
                        <td className="px-3 py-2 border-b border-gray-100">{item.date}</td>
                        <td className="px-3 py-2 border-b border-gray-100">{item.currency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <textarea
            value={transactionData}
            onChange={(event) => setTransactionData(event.target.value)}
            rows={10}
            placeholder="Cole os dados CSV/TXT no formato: descricao;valor;data;categoria;moeda"
            className="w-full border border-gray-300 rounded-md p-2 mb-5"
          />
          <div className="flex justify-center">
            <Button onClick={handleImportTransactions} text="Importar transações" type="greenButton" />
          </div>
        </div>

        <ParagraphContainer css={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button
            onClick={() => {
              window.location.href = "/signout";
            }}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500"
          >
            Sair
          </button>
        </ParagraphContainer>
      </PrivateCard>
    </PrivatePageContainer>
  );
}
