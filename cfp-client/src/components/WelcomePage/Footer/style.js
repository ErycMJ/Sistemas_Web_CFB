import { styled } from '@stitches/react';
import { colors } from "../../../shared/utils/Colors"

const FooterContainer = styled("footer", {
    backgroundColor: colors().lightgreen,
    color: colors().white,
    padding: "2rem 0",
    marginTop: "2rem",

    ".container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        margin: "0 auto"
    }
})

export { FooterContainer }
