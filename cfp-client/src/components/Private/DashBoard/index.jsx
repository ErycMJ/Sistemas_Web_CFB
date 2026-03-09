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
} from "recharts";
import { useDashboard } from "../../../hooks/private/useDashboard";
import { ParagraphContainer } from "../../../shared/utils/Paragraph/style";
import { SubTitleContainer } from "../../../shared/utils/SubTitle/style";
import { TitleContainer } from "../../../shared/utils/Title/style";
import { DashboardCard, DashboardContainer, DashboardGrid, SummaryRow } from "./style";

const formatCurrency = (value) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value || 0);

export default function Dashboard() {
  const {
    balance,
    income,
    expense,
    recentTransactions,
    spendingTrends,
    categoryData,
    categoryLookup,
  } = useDashboard();

  return (
    <DashboardContainer>
      <TitleContainer css={{ marginBottom: "1rem" }}>Dashboard</TitleContainer>

      <DashboardGrid>
        <DashboardCard>
          <SubTitleContainer css={{ color: "#065F46", marginBottom: "0.75rem" }}>
            Resumo da conta
          </SubTitleContainer>
          <SummaryRow>
            <ParagraphContainer css={{ fontSize: "1.125rem" }}>Saldo total:</ParagraphContainer>
            <ParagraphContainer css={{ fontSize: "1.125rem", fontWeight: 700 }}>
              {formatCurrency(balance)}
            </ParagraphContainer>
          </SummaryRow>
          <SummaryRow>
            <ParagraphContainer css={{ fontSize: "1.125rem" }}>Renda total:</ParagraphContainer>
            <p className="text-lg font-bold text-green-600">{formatCurrency(income)}</p>
          </SummaryRow>
          <SummaryRow>
            <ParagraphContainer css={{ fontSize: "1.125rem" }}>Despesas totais:</ParagraphContainer>
            <p className="text-lg font-bold text-red-600">{formatCurrency(expense)}</p>
          </SummaryRow>
        </DashboardCard>

        <DashboardCard>
          <SubTitleContainer css={{ color: "#065F46", marginBottom: "0.75rem" }}>
            Transações recentes
          </SubTitleContainer>
          <ul>
            {recentTransactions.map((transaction, index) => (
              <li key={index} className="mb-2">
                <ParagraphContainer>
                  {new Date(transaction.date).toLocaleDateString("pt-BR")}: {transaction.description} -{" "}
                  <span className={transaction.type === "expense" ? "text-red-600" : "text-green-600"}>
                    {formatCurrency(transaction.amount)}
                  </span>{" "}
                  ({categoryLookup[transaction.category] || "Dado importado"})
                </ParagraphContainer>
              </li>
            ))}
          </ul>
        </DashboardCard>

        <DashboardCard>
          <SubTitleContainer css={{ color: "#065F46", marginBottom: "0.75rem" }}>
            Tendências de gastos
          </SubTitleContainer>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={spendingTrends}>
              <Line type="monotone" dataKey="despesas" stroke="#ff4c4c" name="Despesas" />
              <Line type="monotone" dataKey="receitas" stroke="#4caf50" name="Receitas" />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </DashboardCard>

        <DashboardCard span="two">
          <SubTitleContainer css={{ color: "#065F46", marginBottom: "0.75rem" }}>
            Categorias de despesas
          </SubTitleContainer>
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
        </DashboardCard>

        <DashboardCard>
          <SubTitleContainer css={{ color: "#065F46", marginBottom: "0.75rem" }}>
            Receita vs Despesas
          </SubTitleContainer>
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
        </DashboardCard>
      </DashboardGrid>
    </DashboardContainer>
  );
}
