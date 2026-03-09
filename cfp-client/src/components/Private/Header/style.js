import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const PrivateHeaderContainer = styled("header", {
  backgroundColor: colors().lightgreen,
  borderBottom: `1px solid ${colors().green}`,
  padding: "1rem 1.25rem",
});

const PrivateHeaderContent = styled("div", {
  maxWidth: "72rem",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
});

const PrivateHeaderActions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.75rem",
});

const PrivateHeaderUser = styled("span", {
  color: colors().darkgreen,
  fontWeight: 600,
  fontSize: "0.95rem",

  "&:hover": {
    textDecoration: "underline",
  },
});

export { PrivateHeaderContainer, PrivateHeaderContent, PrivateHeaderActions, PrivateHeaderUser };
