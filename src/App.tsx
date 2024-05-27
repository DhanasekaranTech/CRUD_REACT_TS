import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home.tsx";
import AddProduct from "./components/AddProduct.tsx";
import EditProduct from "./components/EditProduct.tsx";
import Product from './types/product.ts';
import { useEffect, useState } from "react";
import api from './api/products.ts'

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  // fetch data from db.json by using axios
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
      } catch (err) {
        console.log('Error fetching products: ', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts}/>}></Route>
        <Route path="/add" element={<AddProduct/>}></Route>
        <Route path="/edit/:id" element={<EditProduct products={products} setProducts={setProducts}/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
