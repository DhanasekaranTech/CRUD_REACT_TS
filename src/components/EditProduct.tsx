import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Product from "../types/product";
import api from "../api/products";


interface EditProductProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const EditProduct: React.FC<EditProductProps> = ({ products, setProducts }) => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();

  const product = products.find((product) => product.id.toString() === id);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price.toString());
      setBrand(product.brand);
      setCategory(product.category);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct = {
      ...product,
      title,
      price: Number(price),
      brand,
      category,
    };

    try {
      const response = await api.put(`/products/${id}`, updatedProduct);
      setProducts(
        products.map((product) =>
          product.id === response.data.id ? response.data : product
        )
      );
      navigate("/");
    } catch (error) {
      console.error("There was an error updating the product!", error);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container d-flex flex-column align-items-center ">
      <h2>Edit Product</h2>
      <form
        onSubmit={handleSubmit}
        className="form-control  d-flex flex-column align-items-center"
      >
        <label className="form-label">
          Title:
          <input
            className="form-control"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Price:
          <input
            className="form-control"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Brand:
          <input
            className="form-control"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </label>
        <br />
        <label className="form-label">
          Category:
          <input
            className="form-control"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </label>
        <br />
        <div>
        <button className="btn btn-primary btn-sm me-2"  type="submit">
          Update Product
        </button>

        <Link to={"/"}>
          <button className=" btn btn-secondary btn-sm">Back</button>
        </Link>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
