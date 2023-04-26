import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Open Sans", sans-serif;
        padding: 0;
        margin: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
    margin-bottom: 0;
    font-weight: 700;
    }

    .baseContent {
        max-width: 800px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
`;

export default GlobalStyle;
