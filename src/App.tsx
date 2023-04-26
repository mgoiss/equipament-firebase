import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import Router from "./Router";
import { Header } from "./core/components";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
