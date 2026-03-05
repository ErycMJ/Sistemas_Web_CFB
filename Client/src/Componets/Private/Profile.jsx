import { useProfile } from "../../hooks/private"

export const Profile = () => {
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
  } = useProfile()

  return (
    <>
      <div className="max-w-xl mx-auto mt-10 p-5 bg-green-50 shadow-xl rounded-md m-10">
        <h2 className="text-3xl font-semibold text-center mb-5 text-green-800">
          Perfil
        </h2>
        <div className="profile-details-update">
          <div className="mb-5">
            <label className="block text-lg font-medium mb-2 text-green-800">
              Nome de usuário
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            onClick={handleUpdateProfileDetails}
            className="w-full bg-green-800 text-white py-2 rounded-md mb-3 hover:bg-green-700"
          >
            Atualizar perfil
          </button>
        </div>

        <div className="import-transactions mt-10">
          <h3 className="text-2xl font-semibold text-center mb-5 text-green-800">
            Importar transações
          </h3>

          <div className="transaction-type-selector mb-5">
            <label className="block text-lg font-medium mb-2 text-green-800">
              Tipo de transação
            </label>
            <select
              value={transactionType}
              onChange={(event) => setTransactionType(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="income">Receita</option>
              <option value="expense">Despesa</option>
            </select>
          </div>

          <div className="transaction-type-selector mb-5">
            <label className="block text-lg font-medium mb-2 text-green-800">
              Categoria para importação
            </label>
            <select
              value={importCategory}
              onChange={(event) => setImportCategory(event.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-5">
            <label className="block text-lg font-medium mb-2 text-green-800">
              Arquivo de importação (.csv ou .txt)
            </label>
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleImportFile}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
            />
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
          <button
            onClick={handleImportTransactions}
            className="w-full bg-green-800 text-white py-2 rounded-md hover:bg-green-700"
          >
            Importar transações
          </button>
        </div>

        <button onClick={() => window.location.href = "/signout"} className="w-full mt-10 bg-red-600 text-white py-2 rounded-md hover:bg-red-500">
          Sair
        </button>
      </div>
    </>
  )
}
