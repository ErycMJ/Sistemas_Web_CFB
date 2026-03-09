import { MdDelete, MdEdit } from "react-icons/md";
import { useCategory } from "../../../hooks/private/useCategory";
import Button from "../../../shared/utils/Button";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import {
  Overlay,
  PrivateCard,
  PrivateInput,
  PrivateModalCard,
  PrivatePageContainer,
  PrivateSelect,
} from "./style";

export default function Category() {
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
  } = useCategory();

  return (
    <PrivatePageContainer>
      <div className="flex justify-between items-center mb-5">
        <Button onClick={() => setShowAddCategoryForm(true)} text="Adicionar categoria" type="greenButton" />
      </div>

      {showAddCategoryForm && (
        <Overlay>
          <PrivateModalCard ref={formRef} className="mx-auto w-96 max-w-md">
            <SubTitleContainer css={{ color: "#065F46", marginBottom: "1rem" }}>
              Adicionar categoria
            </SubTitleContainer>
            <div className="flex flex-col space-y-4 mb-4">
              <PrivateInput
                type="text"
                id="categoryName"
                placeholder="Nome da categoria"
                value={formData.categoryName || ""}
                onChange={handleChange}
              />
              <PrivateSelect id="categoryType" value={formData.categoryType || ""} onChange={handleChange}>
                <option value="" disabled>
                  Tipo de categoria
                </option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </PrivateSelect>
              <Button onClick={handleAddCategory} text="Adicionar" type="greenButton" />
            </div>
          </PrivateModalCard>
        </Overlay>
      )}

      {showEditCategoryForm && (
        <Overlay>
          <PrivateModalCard ref={formRef}>
            <SubTitleContainer css={{ color: "#065F46", marginBottom: "1rem" }}>
              Editar categoria
            </SubTitleContainer>
            <div className="flex flex-col space-y-4 mb-4">
              <PrivateInput
                type="text"
                id="categoryName"
                placeholder="Nome da categoria"
                value={formData.categoryName || ""}
                onChange={handleChange}
              />
              <PrivateSelect id="categoryType" value={formData.categoryType || ""} onChange={handleChange}>
                <option value="" disabled>
                  Tipo de categoria
                </option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </PrivateSelect>
              <Button onClick={handleEditCategory} text="Salvar" type="greenButton" />
            </div>
          </PrivateModalCard>
        </Overlay>
      )}

      {showDeleteConfirmation && (
        <Overlay>
          <PrivateModalCard ref={formRef}>
            <SubTitleContainer css={{ color: "#065F46", marginBottom: "1rem" }}>
              Excluir categoria
            </SubTitleContainer>
            <ParagraphContainer>Tem certeza de que deseja excluir esta categoria?</ParagraphContainer>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button onClick={handleDeleteCategory} className="px-4 py-2 bg-red-600 text-white rounded-md">
                Excluir
              </button>
            </div>
          </PrivateModalCard>
        </Overlay>
      )}

      {incomeCategories.length > 0 ? (
        <>
          <SubTitleContainer css={{ color: "#065F46", fontSize: "1.5rem" }}>Categorias de receitas</SubTitleContainer>
          <PrivateCard>
            <div className="flex flex-col space-y-2">
              {incomeCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-md border-green-700"
                >
                  <ParagraphContainer css={{ fontWeight: 500 }}>{category.categoryName}</ParagraphContainer>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditButtonClick(category)} className="text-blue-600 hover:underline">
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
          </PrivateCard>
        </>
      ) : null}

      {expenseCategories.length > 0 ? (
        <>
          <SubTitleContainer css={{ color: "#065F46", fontSize: "1.5rem" }}>Categorias de despesas</SubTitleContainer>
          <PrivateCard>
            <div className="flex flex-col space-y-2">
              {expenseCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex justify-between items-center p-1 border-b-2 border-r-2 rounded-md border-green-700"
                >
                  <ParagraphContainer css={{ fontWeight: 500 }}>{category.categoryName}</ParagraphContainer>
                  <div className="flex space-x-2">
                    <button onClick={() => handleEditButtonClick(category)} className="text-blue-600 hover:underline">
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
          </PrivateCard>
        </>
      ) : null}
    </PrivatePageContainer>
  );
}
