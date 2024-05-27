import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/products";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = { title, price, category, brand, description };
    try {
      const response = await api.post("/products", newProduct);
      console.log("Product added", response.data);
      navigate("/");
    } catch (err) {
      console.error("error is adding products", err);
    }
  };
  return (
    <div className="container d-flex flex-column align-items-center ">
      <h1>Add Product you like</h1>

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
        <label className="form-label">
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
        <label className="form-label">
          description:
          <input
            className="form-control"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <br />
        <div>
          <button
            type="submit"
            onClick={() => alert("added successfully")}
            className="btn btn-info btn-sm me-3"
          >
            Add Product
          </button>
          <Link to={"/"}>
            <button className=" btn btn-secondary btn-sm">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default AddProduct;
