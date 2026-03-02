import { MdDelete, MdEdit } from "react-icons/md"
import { useCategory } from "../../hooks/private"

const Category = () => {
  const {
    incomeCategories,
    expenseCategories,
    formData,
    showAddCategoryForm,
    setShowAddCategoryForm,
    showEditCategoryForm,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
    formRef,
    handleChange,
    handleAddCategory,
    handleDeleteCategory,
    handleEditCategory,
    handleEditButtonClick,
    handleDeleteButtonClick,
  } = useCategory()

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-5">
          <button
            onClick={() => setShowAddCategoryForm(true)}
            className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
          >
            Adicionar categoria
          </button>
        </div>

        {showAddCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-md shadow-lg z-50 mx-auto w-96 max-w-md">
              <h3 className="mb-4 text-xl font-medium text-green-800">Adicionar categoria</h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Nome da categoria"
                  value={formData.categoryName || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  id="categoryType"
                  value={formData.categoryType || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Tipo de categoria</option>
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
                <button
                  onClick={handleAddCategory}
                  className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditCategoryForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Editar categoria</h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="text"
                  id="categoryName"
                  placeholder="Nome da categoria"
                  value={formData.categoryName || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <select
                  id="categoryType"
                  value={formData.categoryType || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="" disabled>Tipo de categoria</option>
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
                <button
                  onClick={handleEditCategory}
                  className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={formRef} className="bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md">
              <h3 className="mb-4 text-lg font-medium text-green-800">Excluir categoria</h3>
              <p>Tem certeza de que deseja excluir esta categoria?</p>
              <div className="flex justify-end space-x-4 mt-4">
                <button
                  onClick={() => setShowDeleteConfirmation(false)}
                  className="px-4 py-2 bg-gray-300 rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteCategory}
                  className="px-4 py-2 bg-red-600 text-white rounded-md"
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}

        {incomeCategories.length > 0 ? (
          <>
            <span className="text-xl font-bold text-green-800 mb-4">Categorias de receitas</span>
            <div className="bg-green-50 p-4 rounded-md mb-5 shadow-lg">
              <div className="flex flex-col space-y-2">
                {incomeCategories.map((category) => (
                  <div key={category._id} className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-md border-green-700">
                    <span className="text-green-800 text-md font-medium">{category.categoryName}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditButtonClick(category)}
                        className="text-blue-600 hover:underline"
                      >
                        <MdEdit className="text-green text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteButtonClick(category._id)}
                        className="text-red-600 hover:underline"
                      >
                        <MdDelete className="text-red text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}

        {expenseCategories.length > 0 ? (
          <>
            <span className="text-xl font-bold text-green-800 mb-4">Categorias de despesas</span>
            <div className="bg-green-50 p-4 rounded-md mb-5 shadow-lg">
              <div className="flex flex-col space-y-2">
                {expenseCategories.map((category) => (
                  <div key={category._id} className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-md border-green-700">
                    <span className="text-green-800 text-md font-medium">{category.categoryName}</span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditButtonClick(category)}
                        className="text-blue-600 hover:underline"
                      >
                        <MdEdit className="text-green text-xl" />
                      </button>
                      <button
                        onClick={() => handleDeleteButtonClick(category._id)}
                        className="text-red-600 hover:underline"
                      >
                        <MdDelete className="text-red text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : null}
      </div>
    </>
  )
}

export default Category
