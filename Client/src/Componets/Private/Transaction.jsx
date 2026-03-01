import TransactionFilters from './TransactionFilters';
import TransactionFormModal from './TransactionFormModal';
import TransactionDeleteModal from './TransactionDeleteModal';
import TransactionList from './TransactionList';
import { useTransactions } from '../../hooks/private';

const Transaction = () => {
  const {
    categories,
    categoriesTransaction,
    showAddTransactionForm,
    setShowAddTransactionForm,
    showEditTransactionForm,
    setShowEditTransactionForm,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    filteredTransactions,
    filterCategory,
    setFilterCategory,
    filterText,
    setFilterText,
    amountRange,
    setAmountRange,
    min,
    max,
    formData,
    formRef,
    handleChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleEditButtonClick,
    handleDeleteButtonClick,
    getCategoryNameById,
  } = useTransactions();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex justify-between items-center mb-5">
        <button
          onClick={() => setShowAddTransactionForm(true)}
          className="bg-green-800 px-5 py-3 rounded-3xl text-white hover:bg-green-700"
        >
          Adicionar Transação
        </button>
      </div>

      <TransactionFilters
        categoriesTransaction={categoriesTransaction}
        filterCategory={filterCategory}
        onFilterCategoryChange={setFilterCategory}
        filterText={filterText}
        onFilterTextChange={setFilterText}
        amountRange={amountRange}
        onAmountRangeChange={setAmountRange}
        min={min}
        max={max}
      />

      <TransactionFormModal
        isOpen={showAddTransactionForm}
        title="Adicionar transação"
        formData={formData}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleAddTransaction}
        onCancel={() => setShowAddTransactionForm(false)}
        submitLabel="Adicionar"
        formRef={formRef}
        allowTransferType={false}
      />

      <TransactionFormModal
        isOpen={showEditTransactionForm}
        title="Editar transação"
        formData={formData}
        categories={categories}
        onChange={handleChange}
        onSubmit={handleEditTransaction}
        onCancel={() => setShowEditTransactionForm(false)}
        submitLabel="Editar"
        formRef={formRef}
        allowTransferType={true}
      />

      <TransactionDeleteModal
        isOpen={showDeleteConfirmation}
        formRef={formRef}
        onCancel={() => setShowDeleteConfirmation(false)}
        onConfirm={handleDeleteTransaction}
      />

      <TransactionList
        transactions={filteredTransactions}
        getCategoryNameById={getCategoryNameById}
        onEdit={handleEditButtonClick}
        onDelete={handleDeleteButtonClick}
      />
    </div>
  );
};

export default Transaction;
