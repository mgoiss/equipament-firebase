import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Router from "./Router";
import Header from "./core/components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  );
}

export default App;
