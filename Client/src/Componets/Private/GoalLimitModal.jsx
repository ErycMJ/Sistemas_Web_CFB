import { MdEdit } from "react-icons/md"
import moment from "moment"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts"
import { useGoalLimit } from "../../hooks/private"

const GoalLimit = () => {
  const {
    goalsLimits,
    formData,
    showAddGoalLimitForm,
    setShowAddGoalLimitForm,
    showEditGoalLimitForm,
    formRef,
    handleChange,
    handleAddGoalLimit,
    handleEditGoalLimit,
    handleEditButtonClick,
    chartData,
  } = useGoalLimit()

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex justify-between items-center mb-5">
          {goalsLimits.length === 0 && (
            <button
              onClick={() => setShowAddGoalLimitForm(true)}
              className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
            >
              Adicionar meta e limite
            </button>
          )}
        </div>

        {showAddGoalLimitForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={formRef}
              className="bg-white p-6 rounded-md shadow-lg z-50 mx-auto w-96 max-w-md"
            >
              <h3 className="mb-4 text-xl font-medium text-green-800">
                Adicionar meta e limite
              </h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="number"
                  id="goal"
                  placeholder="Meta"
                  value={formData.goal || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  id="limit"
                  placeholder="Limite"
                  value={formData.limit || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleAddGoalLimit}
                  className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}

        {goalsLimits.length > 0 ? (
          <>
            <span className="text-xl font-bold text-green-800 mb-4">
              Metas e limites
            </span>
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="bg-white p-4 rounded-md shadow-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Metas (receitas)</h3>
                <div className="flex flex-col space-y-2">
                  {goalsLimits.map((goalLimit) => (
                    <div
                      key={goalLimit._id}
                      className="flex justify-between items-center p-1 border-b-2 border-green-700 rounded-md"
                    >
                      <span className="text-green-800 text-md font-medium">
                        Meta: {goalLimit.goal}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Modificado: {moment(goalLimit.updatedAt).format("DD/MM/YYYY")}
                      </span>
                      <button
                        onClick={() => handleEditButtonClick(goalLimit)}
                        className="text-green-700 hover:text-green-600"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-md shadow-lg">
                <h3 className="text-lg font-bold text-green-800 mb-2">Limites (despesas)</h3>
                <div className="flex flex-col space-y-2">
                  {goalsLimits.map((goalLimit) => (
                    <div
                      key={goalLimit._id}
                      className="flex justify-between items-center p-1 border-b-2 border-green-700 rounded-md"
                    >
                      <span className="text-green-800 text-md font-medium">
                        Limite: {goalLimit.limit}
                      </span>
                      <span className="text-gray-500 text-sm">
                        Modificado: {moment(goalLimit.updatedAt).format("DD/MM/YYYY")}
                      </span>
                      <button
                        onClick={() => handleEditButtonClick(goalLimit)}
                        className="text-green-700 hover:text-green-600"
                      >
                        <MdEdit className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-md shadow-lg">
              <h3 className="text-xl font-bold text-green-800 mb-4">
                Comparação de metas e transações
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="receitas" fill="#4caf50" name="Receitas" />
                  <Bar dataKey="despesas" fill="#f44336" name="Despesas" />
                  <Line
                    type="monotone"
                    dataKey="meta"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    name="Meta"
                  />
                  <Line
                    type="monotone"
                    dataKey="limite"
                    stroke="#ff9800"
                    strokeWidth={3}
                    dot={false}
                    name="Limite"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        ) : (
          <p className="text-center text-gray-600">
            Nenhuma meta ou limite encontrado.
          </p>
        )}

        {showEditGoalLimitForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              ref={formRef}
              className="bg-white p-6 rounded-md shadow-lg z-50 w-full max-w-md"
            >
              <h3 className="mb-4 text-lg font-medium text-green-800">
                Editar meta e limite
              </h3>
              <div className="flex flex-col space-y-4 mb-4">
                <input
                  type="number"
                  id="goal"
                  placeholder="Meta"
                  value={formData.goal || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <input
                  type="number"
                  id="limit"
                  placeholder="Limite"
                  value={formData.limit || ""}
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
                <button
                  onClick={handleEditGoalLimit}
                  className="bg-green-800 px-5 py-3 rounded-md text-white hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GoalLimit
