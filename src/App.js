import { BrowserRouter } from "react-router-dom";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Routes } from "./routes/app.routes";

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes />
      <Footer />
    </BrowserRouter>
  );
}
