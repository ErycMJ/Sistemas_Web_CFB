import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { useDashboard } from "../../hooks/private"

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0)

const Dashboard = () => {
  const {
    balance,
    income,
    expense,
    recentTransactions,
    spendingTrends,
    categoryData,
    categoryLookup,
  } = useDashboard()

  return (
    <div className="p-6 m-4 bg-white rounded-md shadow-lg">
      <h2 className="text-3xl font-bold text-green-800 mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-4 rounded-md shadow-lg bg-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Resumo da conta</h3>
          <div className="flex justify-between mb-2">
            <p className="text-lg">Saldo total:</p>
            <p className="text-lg font-bold">{formatCurrency(balance)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg">Renda total:</p>
            <p className="text-lg font-bold text-green-600">{formatCurrency(income)}</p>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-lg">Despesas totais:</p>
            <p className="text-lg font-bold text-red-600">{formatCurrency(expense)}</p>
          </div>
        </div>

        <div className="p-4 rounded-md shadow-lg bg-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Transações recentes</h3>
          <ul>
            {recentTransactions.map((transaction, index) => (
              <li key={index} className="mb-2">
                <p>
                  {new Date(transaction.date).toLocaleDateString("pt-BR")}: {transaction.description} -{" "}
                  <span
                    className={
                      transaction.type === "expense" ? "text-red-600" : "text-green-600"
                    }
                  >
                    {formatCurrency(transaction.amount)}
                  </span>{" "}
                  ({categoryLookup[transaction.category] || "Dado importado"})
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4 rounded-md shadow-lg bg-green-100">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Tendências de gastos</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingTrends}>
              <Line type="monotone" dataKey="despesas" stroke="#ff4c4c" name="Despesas" />
              <Line type="monotone" dataKey="receitas" stroke="#4caf50" name="Receitas" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-md shadow-lg bg-green-100 col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Categorias de despesas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {categoryData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 0 ? `hsl(${index * 36}, 100%, 50%)` : "#ccc"}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="p-4 rounded-md shadow-lg bg-green-100 col-span-1 md:col-span-2 lg:col-span-1">
          <h3 className="text-xl font-semibold text-green-800 mb-2">Receita vs Despesas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={spendingTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="receitas" fill="#4caf50" name="Receitas" />
              <Bar dataKey="despesas" fill="#ff4c4c" name="Despesas" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
