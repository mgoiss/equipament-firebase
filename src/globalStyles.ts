import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        font-family: "Open Sans", sans-serif;
        padding: 0;
        margin: 0;
    }

    body {
        background-color: #f2f2f2;
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

    .baseContainer {
        margin-top: 40px;
        margin-bottom: 40px;
    }
`;

export default GlobalStyle;
