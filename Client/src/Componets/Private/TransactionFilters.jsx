import ReactSlider from "react-slider"

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0)

const TransactionFilters = ({
  categoriesTransaction,
  filterCategory,
  onFilterCategoryChange,
  filterText,
  onFilterTextChange,
  amountRange,
  onAmountRangeChange,
  min,
  max,
}) => {
  return (
    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
      <div className="flex items-center">
        <label className="mr-2">Categoria:</label>
        <select
          value={filterCategory}
          onChange={(e) => onFilterCategoryChange(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          {categoriesTransaction.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center">
        <label className="mr-2">Busca:</label>
        <input
          type="text"
          value={filterText}
          onChange={(e) => onFilterTextChange(e.target.value)}
          placeholder="Pesquisar por nota"
          className="px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex items-center">
        <label className="mr-2">Faixa de valor:</label>
        <span className="text-gray-700 font-bold">{formatCurrency(amountRange[0])}</span>
        <ReactSlider
          className="w-48 h-4 mx-2"
          thumbClassName="w-4 h-4 bg-green-800 rounded-full cursor-pointer"
          trackClassName="h-1 bg-gray-300 my-2"
          min={min}
          max={max}
          value={amountRange}
          onChange={onAmountRangeChange}
          withTracks={true}
        />
        <span className="mx-2"></span>
        <span className="text-gray-700 font-bold">{formatCurrency(amountRange[1])}</span>
      </div>
    </div>
  )
}

TransactionFilters.propTypes = {
  categoriesTransaction: () => null,
  filterCategory: () => null,
  onFilterCategoryChange: () => null,
  filterText: () => null,
  onFilterTextChange: () => null,
  amountRange: () => null,
  onAmountRangeChange: () => null,
  min: () => null,
  max: () => null,
}

export default TransactionFilters
