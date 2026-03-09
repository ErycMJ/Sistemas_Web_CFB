import { styled } from '@stitches/react';
import { colors } from "../../../shared/utils/Colors"

const FooterContainer = styled("footer", {
    backgroundColor: colors().green,
    color: colors().white,
    padding: "2rem 0",

    ".container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
    }
})

export { FooterContainer }
