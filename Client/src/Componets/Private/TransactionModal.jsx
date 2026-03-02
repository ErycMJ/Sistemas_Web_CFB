import { FaPlus } from "react-icons/fa"
import {
  CURRENCY_OPTIONS,
  RECURRENCE_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from "./transactionDefaults"
import { useTransactionModal } from "../../hooks/private"

const TransactionModal = () => {
  const {
    categories,
    showAddTransactionForm,
    setShowAddTransactionForm,
    formData,
    formRef,
    handleChange,
    handleAddTransaction,
  } = useTransactionModal()

  return (
    <div className="">
      <div className="bottom-0 p-4 mt-12">
        <button
          onClick={() => setShowAddTransactionForm(true)}
          className="w-full flex items-center justify-center text-white bg-green-600 hover:bg-green-500 p-3 rounded-md transition-all duration-300"
        >
          <FaPlus className="text-2xl" />
        </button>
      </div>

      {showAddTransactionForm && (
        <div
          ref={formRef}
          className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-lg font-medium mb-4">Adicionar transação</h3>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  {TRANSACTION_TYPE_OPTIONS.map((option) => (
                    <option key={option.value || "default"} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Data</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
            {formData.type !== "transfer" && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Categoria</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="">Selecione a categoria</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {formData.type === "transfer" && (
              <div className="flex justify-between">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Transferir para</label>
                  <select
                    name="transferTo"
                    value={formData.transferTo}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Selecione o usuário</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Transferir de</label>
                  <select
                    name="transferFrom"
                    value={formData.transferFrom}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  >
                    <option value="">Selecione o usuário</option>
                  </select>
                </div>
              </div>
            )}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Nota</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Valor</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Moeda</label>
                <select
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md w-full"
                >
                  {CURRENCY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Recorrência</label>
              <select
                name="recurrence"
                value={formData.recurrence}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              >
                {RECURRENCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            {formData.recurrence !== "never" ? (
              <div className="flex justify-between">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Data de término</label>
                  <input
                    type="date"
                    name="end"
                    value={formData.end}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Lembrar data</label>
                  <input
                    type="date"
                    name="remind"
                    value={formData.remind}
                    onChange={handleChange}
                    className="px-3 py-2 border border-gray-300 rounded-md w-full"
                  />
                </div>
              </div>
            ) : null}
            <div className="flex justify-end">
              <button
                onClick={handleAddTransaction}
                className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700 mr-2"
              >
                Adicionar
              </button>
              <button
                onClick={() => setShowAddTransactionForm(false)}
                className="bg-red-600 px-5 py-3 rounded-md text-white hover:bg-red-500"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TransactionModal
