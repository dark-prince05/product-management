import { useState } from "react";
import "./App.css";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import SearchSortBar from "./components/SearchSortBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchSortBar />
    </>
  );
}

export default App;
