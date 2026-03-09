import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const FaqsContainer = styled("div", {
  maxWidth: "72rem",
  margin: "1rem auto",
  padding: "0 1rem",
});

const HomeHeading = styled("div", {
  textAlign: "center",
  marginBottom: "2.5rem",
});

const FaqList = styled("div", {
  display: "grid",
  gap: "1rem",
});

const FaqItem = styled("details", {
  borderLeft: `4px solid ${colors().mediumgreen}`,
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  backgroundColor: colors().lightgreen,
  padding: "1.5rem",
  borderRadius: "0.25rem",
});

const FaqSummary = styled("summary", {
  display: "flex",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.5rem",
});

export { FaqsContainer, HomeHeading, FaqList, FaqItem, FaqSummary };
