import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/products";
import Product from "../types/product";
import { useNavigate } from "react-router-dom";
import '../style.css'

// interface Product {
//   id: number;
//   title: string;
//   price: number;
//   brand: string;
//   category: string;
//   description: string;
// }

interface Home {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const Home: React.FC<Home> = ({ products, setProducts }) => {
  const navigate = useNavigate();
  //const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setselectedcategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title"); //title or price
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await api.get("/products");
  //       setProducts(response.data);
  //     } catch (err) {
  //       return console.log("Error fetching products: ", err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

// calculation for pagination
  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;

  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory ? product.category === selectedCategory : true) &&
      (searchTerm
        ? product.brand.toLowerCase().includes(searchTerm.toLowerCase())
        : true)
  );

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const sortProducts = (field: string, order: string) => {
    const sortedProducts = [...products].sort((a, b) => {
      if (field === "title") {
        return order === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (field === "price") {
        return order === "asc" ? a.price - b.price : b.price - a.price;
      }
      return 0;
    });
    setProducts(sortedProducts);
  };

  const handleSortByTitle = () => {
    const order = sortBy === "title" && sortOrder === "asc" ? "desc" : "asc";
    setSortBy("title");
    setSortOrder(order);
    sortProducts("title", order);
  };

  // const handleSortByPrice = () => {
  //   const order = sortBy === "price" && sortOrder === "asc" ? "desc" : "asc";
  //   setSortBy("price");
  //   setSortOrder(order);
  //   sortProducts("price", order);
  // };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedcategory(e.target.value);
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewProduct = (product: Product) => {
    alert(`product details: ${product.description}`);
  };

  const handleDeleteProduct = async (id: number, title: string) => {
    try {
      await api.delete(`/products/${id}`);
      const productList = products.filter((product) => product.id !== id);
      setProducts(productList);
      return await alert(`product deleted successfully: ${title}`);
    } catch (error) {
      return console.error("Error deleting product: ", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevpage) => prevpage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevpage) => Math.max(prevpage - 1, 1));
  };

  return (
    <div className="bg-img ">
    <div className="container mt-5 bg-">
      {/*Heading  */}
      <h1 className="font mb-5 mt-10px  text-light">Product details</h1>

      <div className="d-flex justify-content-evenly">
        {/* filter by category  */}

        <div className="mb-3">
          <select className="form-control" onChange={handleCategoryChange}>
            <option value="">select category</option>
            <option value="smartphones">smartphones</option>
            <option value="laptops">laptops</option>
            <option value="fragrances">fragrances</option>
            <option value="skin-care">skincare</option>
            <option value="furniture">furniture</option>
            <option value="motorcycle">motorcycle</option>
          </select>
        </div>
        {/* add input for search product by brand */}
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="search by brand eg.apple"
            onChange={handleSearchChange}
          />
        </div>

        {/* button for add product */}

        <Link to="/add" className="btn btn-primary mb-3">
          Add Product
        </Link>
      </div>

      {/* product table*/}
      <table className="table table-success table-striped">
        <thead>
          <tr>
            <th onClick={handleSortByTitle}>
              Name {sortBy === "title" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th /*onClick={handleSortByPrice}*/>
              Price
              {/* {sortBy === "price" && (sortOrder === "asc" ? "▲" : "▼")} */}
            </th>
            <th>Brand</th>
            <th>category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>

              <td>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => handleViewProduct(product)}
                >
                  view
                </button>

                <button
                  className="btn btn-warning btn-sm ms-2 me-2"
                  onClick={() => navigate(`/edit/${product.id}`)}
                >
                  edit
                </button>

                <button
                  className="btn btn-danger btn-sm "
                  onClick={() => handleDeleteProduct(product.id, product.title)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary mb-5"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="btn btn-primary mb-5"
          onClick={handleNextPage}
          disabled={indexOfLastProduct >= products.length}
        >
          Next
        </button>
      </div>
    </div>
    </div>
  );
};

export default Home;
