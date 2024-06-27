import axios from 'axios';

const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE5NDc5MDMwLCJpYXQiOjE3MTk0Nzg3MzAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFhMDk1YmRkLTZkZDgtNGIxMy1iYzE5LWIyYmY0ZTY4MDMwOSIsInN1YiI6ImFtaXQyMDIxY3MxNjVAYWJlc2l0LmVkdS5pbiJ9LCJjb21wYW55TmFtZSI6ImdvbWFydCIsImNsaWVudElEIjoiYWEwOTViZGQtNmRkOC00YjEzLWJjMTktYjJiZjRlNjgwMzA5IiwiY2xpZW50U2VjcmV0IjoiWmNiZWlxdGVSVFZITnNLUyIsIm93bmVyTmFtZSI6IkFtaXQga3VtYXIiLCJvd25lckVtYWlsIjoiYW1pdDIwMjFjczE2NUBhYmVzaXQuZWR1LmluIiwicm9sbE5vIjoiMjEwMjkwMDEwMDAxNCJ9.XeSbEmpS80Bp39E92myUay2MJdGsbVEJNRchT1sqAMs";
const serverApi = "http://20.244.56.144/test";

// Function to fetch the data from the API
async function fetchProductData(company, category, minPrice, maxPrice, top) {
  try {
    const response = await axios.get(
      `${serverApi}/companies/${company}/categories/${category}/products`,
      {
        headers: { Authorization: `Bearer ${access_token}` },
        params: { top, minPrice, maxPrice }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product data:', error);
    throw error;
  }
}

export default fetchProductData;
