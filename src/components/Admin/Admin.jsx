import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin.css";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: null });
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({ id: "", name: "", price: "", image: null });

  // Fetch Products
  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  // Handle File Selection
  const handleFileChange = (e, isEdit = false) => {
    if (isEdit) {
      setUpdatedProduct({ ...updatedProduct, image: e.target.files[0] });
    } else {
      setNewProduct({ ...newProduct, image: e.target.files[0] });
    }
  };

  // Add Product
  const handleAddProduct = async () => {
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image);

    try {
      const res = await axios.post("http://localhost:5000/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProducts([...products, res.data]);
      setNewProduct({ name: "", price: "", image: null });
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  // Delete Product
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/delete/${id}`);
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  // Enable Edit Mode
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setUpdatedProduct({ id: product.id, name: product.name, price: product.price, image: product.image });
  };

  // Handle Update Product
  const handleUpdateProduct = async () => {
    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("price", updatedProduct.price);
    if (updatedProduct.image instanceof File) {
      formData.append("image", updatedProduct.image);
    } else {
      formData.append("existingImage", updatedProduct.image);
    }

    try {
      await axios.put(`http://localhost:5000/products/update/${updatedProduct.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts(products.map((product) =>
        product.id === updatedProduct.id ? { ...updatedProduct } : product
      ));
      setEditingProduct(null);
    } catch (err) {
      console.error("Error updating product", err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Add Product</h3>
      <input type="text" placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
      <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
      <input type="file" onChange={(e) => handleFileChange(e)} />
      <button onClick={handleAddProduct}>Add Product</button>

      <h3>Products List</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {editingProduct === product.id ? (
              <>
                <input type="text" value={updatedProduct.name} onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })} />
                <input type="text" value={updatedProduct.price} onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })} />
                <input type="file" onChange={(e) => handleFileChange(e, true)} />
                <button onClick={handleUpdateProduct}>Save</button>
                <button onClick={() => setEditingProduct(null)}>Cancel</button>
              </>
            ) : (
              <>
                <img src={`http://localhost:5000${product.image}`} alt={product.name} width="50" />
                <h4>{product.name}</h4>
                <p>₹{product.price}</p>
                <button onClick={() => handleEdit(product)}   style={{color : "white",backgroundColor:"blue"}}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
