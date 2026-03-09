import { styled } from "@stitches/react";

const WelcomePageContainer = styled("div", {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",

    variables: {
        type: {
            lightBackground: {
                backgroundColor: "#f0f0f0",
            },
            darkBackground: {
                backgroundColor: "#333",
            },
        },
    }
});

export { WelcomePageContainer }