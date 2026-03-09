import { styled } from "@stitches/react";
import { colors } from "../Colors";
import { Link } from "react-router-dom";

const InternalLinkContainer = styled(Link, {
    color: colors().darkgreen,

    variants: {
        type: {
            bold: {
                fontWeight: "bold",
                fontSize: "24px",
            },
            normal: {
                fontWeight: "medium",
                fontSize: "16px",
            },
        },
    },
});

export { InternalLinkContainer };
