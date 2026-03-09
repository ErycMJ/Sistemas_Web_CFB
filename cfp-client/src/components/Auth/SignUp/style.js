import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const AuthPageContainer = styled("section", {
  padding: "1.75rem",
  maxWidth: "32rem",
  margin: "2.5rem auto",
  backgroundColor: colors().green,
  borderRadius: "0.5rem",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
});

const AuthForm = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const AuthInput = styled("input", {
  border: "1px solid #d1d5db",
  padding: "0.75rem",
  borderRadius: "0.375rem",
  color: colors().darkgreen,
  fontWeight: 500,
  width: "100%",
});

const AuthDivider = styled("span", {
  textAlign: "center",
  color: colors().darkgreen,
  fontSize: "0.875rem",
  fontWeight: 500,
});

const AuthFooter = styled("div", {
  display: "flex",
  gap: "0.5rem",
  marginTop: "1.25rem",
  justifyContent: "center",
  alignItems: "center",
});

export { AuthPageContainer, AuthForm, AuthInput, AuthDivider, AuthFooter };
