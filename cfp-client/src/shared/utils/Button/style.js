import { styled } from '@stitches/react';
import { colors } from '../Colors';

const ButtonContainer = styled("button", {
    padding: "10px",
    fontSize: "16px",
    fontWeight: 900,
    display: "block",
    textAlign: "center",
    width: "150px",
    borderRadius: "5px",
    margin: "5px",

    variants: {
        type: {
            greenButton: {
                backgroundColor: colors().green,
                color: colors().white,

                "&:hover": {
                    backgroundColor: colors().darkgreen,
                    cursor: "pointer"
                }
            }
        }
    }
})

export { ButtonContainer }