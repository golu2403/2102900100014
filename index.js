import express from "express";
import axios from "axios";

import fetchProductData from './controller/fetchdata.js';


const app = express();

const PORT = 4000;

 

app.use(express.json());

app.get("companies/:companyName/categories/:categoryname/products", async (req, res) => {
  const { categoryname } = req.params;
  const {
    n,
    page = 1,
    sort_by,
    order = "asc",
    minPrice,
    maxPrice,
  } = req.query;

  if (!n || isNaN(n) || n <= 0) {
    return res.status(400).json({ message: 'Invalid "n" parameter' });
  }

  try {
    const products = await fetchProductData(
        companyName,
      categoryname,
      minPrice,
      maxPrice,
      n
    );
    if (sort_by) {
        products.sort((a, b) => {
          if (order === "asc") {
            return a[sort_by] > b[sort_by] ? 1 : -1;
          } else {
            return a[sort_by] < b[sort_by] ? 1 : -1;
          }
        });
      }
  
      // to get the n number of products per page
  
  
      const startIndex = (page - 1) * n; // getting the starting index from the products should start
  
      const perPageProducts = products.slice(startIndex, startIndex + n);
  
      res.status(200).json(perPageProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/categories/:categoryname/products/:productid", async (req, res) => {
    const { categoryname, productid } = req.params;
    const { company } = req.query;
  
    try {
      const products = await fetchProductData(company, categoryname);
      const product = products.find((p) => p.id === productid);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`);
  });  