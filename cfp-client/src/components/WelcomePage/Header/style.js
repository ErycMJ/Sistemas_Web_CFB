import { styled } from "@stitches/react";
import { colors } from "../../../shared/utils/Colors";

const HeaderContainer = styled("span", {
    backgroundColor: colors().darkgreen,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    padding: "1rem",
});

export { HeaderContainer }