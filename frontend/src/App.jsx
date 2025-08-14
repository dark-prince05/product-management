import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <ProductList
      items={[
        { id: 1, name: "hi", price: 20, description: "hhhh", stocks: 33 },
        {
          id: 1,
          name: "hi",
          price: 20,
          description: " df ffd df fd d fd df df dfdf df dfhhhh",
          stocks: 33,
        },
        { id: 1, name: "hi", price: 20, description: "hhhh", stocks: 33 },
      ]}
    />
  );
}

export default App;
