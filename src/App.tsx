import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { MDBInput } from "mdbreact";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Products } from "./Components/ProductModel";

function App() {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Products[]>([]);
  const[product, setProduct] = useState<Products>();

  const getCategories = async () => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setCategories(json);
      });
    console.log(categories);
  };

  const handleCategoryChange = async (category : string) => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        console.log(products);
      });
  };

  const handleProductChange = async (id : string) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res=>res.json())
            .then(json=>{console.log(json)
            setProduct(json)})
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <div className="navbar-brand text-center mx-auto text-white">
            <h2>My Fabulous Store</h2>
          </div>
        </div>
      </nav>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={10}
              label="Age"
            ></Select>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}></Grid>
        </Grid>
      </Container>
      <div className="row p-4">
        <div className="col-lg-3">
          <div className="card">
            <select
              data-placeholder="Select country"
              className="form-select clear form-select-solid fw-bold"
              onChange={async (event) => {
               handleCategoryChange(event.target.value)
               console.log(event.target.value)
              }}
            >
              <option value="">-Select Category-</option>
              {categories.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
            <select
              data-placeholder="Select country"
              className="form-select clear form-select-solid fw-bold"
              onChange={async (event) => {
                handleProductChange(event.target.value)
                console.log(event.target.value)
               }}
            >
              <option value="">-Select Product-</option>
              {products.map((x) => (
                <option value={x.id}>{x.title}</option>
              ))}
            </select>
            <label></label>
            <img src={product?.image} alt="Metronic logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
