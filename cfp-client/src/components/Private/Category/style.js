import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const PrivatePageContainer = styled("section", {
  maxWidth: "72rem",
  margin: "2.5rem auto 0",
  padding: "0 1rem",
});

const PrivateCard = styled("article", {
  backgroundColor: colors().lightgreen,
  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.375rem",
  padding: "1.25rem",
  marginBottom: "1.25rem",
});

const PrivateModalCard = styled("div", {
  backgroundColor: colors().white,
  borderRadius: "0.375rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  zIndex: 50,
  width: "100%",
  maxWidth: "28rem",
  padding: "1.5rem",
});

const PrivateInput = styled("input", {
  width: "100%",
  padding: "0.5rem 0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.375rem",
});

const PrivateSelect = styled("select", {
  width: "100%",
  padding: "0.5rem 0.75rem",
  border: "1px solid #d1d5db",
  borderRadius: "0.375rem",
  backgroundColor: colors().white,
});

const Overlay = styled("div", {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
});

export { PrivatePageContainer, PrivateCard, PrivateModalCard, PrivateInput, PrivateSelect, Overlay };
