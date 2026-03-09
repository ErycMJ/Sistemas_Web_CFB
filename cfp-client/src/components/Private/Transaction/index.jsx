import TransactionFilters from "../TransactionFilters";
import TransactionFormModal from "../TransactionFormModal";
import TransactionDeleteModal from "../TransactionDeleteModal";
import TransactionList from "../TransactionList";
import { useTransactions } from "../../../hooks/private";
import Button from "../../../shared/utils/Button";
import { PrivatePageContainer } from "./style";

export default function Transaction() {
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
    <PrivatePageContainer>
      <div className="flex justify-between items-center mb-5">
        <Button onClick={() => setShowAddTransactionForm(true)} text="Adicionar Transação" type="greenButton" />
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
    </PrivatePageContainer>
  );
}
