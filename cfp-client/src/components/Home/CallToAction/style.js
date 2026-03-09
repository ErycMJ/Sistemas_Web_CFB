import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const HomeSection = styled("section", {
  padding: "5rem 1rem",
  backgroundColor: colors().lightgreen,
});

const HomeContent = styled("div", {
  maxWidth: "72rem",
  margin: "0 auto",
});

const HomeHeading = styled("div", {
  textAlign: "center",
});

export { HomeSection, HomeContent, HomeHeading };
