import {
  TRANSACTION_TYPE_OPTIONS,
  CURRENCY_OPTIONS,
  RECURRENCE_OPTIONS,
} from "./transactionDefaults"

const TransactionFormModal = ({
  isOpen,
  title,
  formData,
  categories,
  onChange,
  onSubmit,
  onCancel,
  submitLabel,
  formRef,
  allowTransferType,
}) => {
  if (!isOpen) {
    return null
  }

  const typeOptions = allowTransferType
    ? [...TRANSACTION_TYPE_OPTIONS, { value: "transfer", label: "Transferir" }]
    : TRANSACTION_TYPE_OPTIONS

  return (
    <div
      ref={formRef}
      className="bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center z-50"
    >
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h3 className="text-lg font-medium mb-4">{title}</h3>
        <div className="flex justify-between">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Tipo</label>
            <select
              name="type"
              value={formData.type}
              onChange={onChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            >
              {typeOptions.map((option) => (
                <option key={option.value || "empty"} value={option.value}>
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
              onChange={onChange}
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
              onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
            onChange={onChange}
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
              onChange={onChange}
              className="px-3 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Moeda</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={onChange}
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
            onChange={onChange}
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          >
            {RECURRENCE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {formData.recurrence !== "never" && (
          <div className="flex justify-between">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Data de término</label>
              <input
                type="date"
                name="end"
                value={formData.end}
                onChange={onChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Lembrar data</label>
              <input
                type="date"
                name="remind"
                value={formData.remind}
                onChange={onChange}
                className="px-3 py-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={onSubmit}
            className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700 mr-2"
          >
            {submitLabel}
          </button>
          <button
            onClick={onCancel}
            className="bg-red-600 px-5 py-3 rounded-md text-white hover:bg-red-500"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

TransactionFormModal.propTypes = {
  isOpen: () => null,
  title: () => null,
  formData: () => null,
  categories: () => null,
  onChange: () => null,
  onSubmit: () => null,
  onCancel: () => null,
  submitLabel: () => null,
  formRef: () => null,
  allowTransferType: () => null,
}

export default TransactionFormModal
