import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const DashboardContainer = styled("section", {
  padding: "1.5rem",
  margin: "1rem",
  backgroundColor: colors().white,
  borderRadius: "0.375rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
});

const DashboardGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  gap: "1.5rem",

  "@media (min-width: 768px)": {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  "@media (min-width: 1024px)": {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
});

const DashboardCard = styled("article", {
  padding: "1rem",
  borderRadius: "0.375rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  backgroundColor: colors().green,

  variants: {
    span: {
      two: {
        gridColumn: "span 1 / span 1",

        "@media (min-width: 768px)": {
          gridColumn: "span 2 / span 2",
        },
      },
      one: {
        gridColumn: "span 1 / span 1",
      },
    },
  },
});

const SummaryRow = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
});

export { DashboardContainer, DashboardGrid, DashboardCard, SummaryRow };
