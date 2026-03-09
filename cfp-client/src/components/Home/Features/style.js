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

const FeatureRow = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  marginTop: "3rem",

  "@media (min-width: 768px)": {
    flexDirection: "row",
  },

  variants: {
    reverseOnDesktop: {
      true: {
        "@media (min-width: 768px)": {
          flexDirection: "row-reverse",
        },
      },
    },
  },
});

const FeatureImage = styled("img", {
  borderRadius: "9999px",
  width: "100%",

  "@media (min-width: 768px)": {
    width: "33%",
  },
});

const FeatureText = styled("div", {
  width: "100%",

  "@media (min-width: 768px)": {
    width: "67%",
  },
});

export {
  HomeSection,
  HomeContent,
  HomeHeading,
  FeatureRow,
  FeatureImage,
  FeatureText,
};