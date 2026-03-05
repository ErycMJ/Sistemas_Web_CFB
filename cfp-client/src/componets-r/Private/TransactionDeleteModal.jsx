const TransactionDeleteModal = ({ isOpen, formRef, onCancel, onConfirm }) => {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={formRef}
        className="bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md"
      >
        <h3 className="mb-4 text-lg font-medium text-green-800">Excluir transação</h3>
        <p>Tem certeza de que deseja excluir esta transação?</p>
        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded-md">
            Cancelar
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-md">
            Excluir
          </button>
        </div>
      </div>
    </div>
  )
}

TransactionDeleteModal.propTypes = {
  isOpen: () => null,
  formRef: () => null,
  onCancel: () => null,
  onConfirm: () => null,
}

export default TransactionDeleteModal
