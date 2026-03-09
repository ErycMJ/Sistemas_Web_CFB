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
  marginBottom: "2.5rem",
});

const TestimonialsGrid = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2rem",

  "@media (min-width: 768px)": {
    flexDirection: "row",
  },
});

const TestimonialCard = styled("article", {
  backgroundColor: "#dcfce7",
  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
  borderRadius: "0.375rem",
  padding: "1.5rem",
  width: "100%",

  "@media (min-width: 768px)": {
    width: "33%",
  },
});

export { HomeSection, HomeContent, HomeHeading, TestimonialsGrid, TestimonialCard };
