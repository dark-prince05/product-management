import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";

function App() {
  const [count, setCount] = useState(0);

  return <ProductForm />;
}

export default App;
