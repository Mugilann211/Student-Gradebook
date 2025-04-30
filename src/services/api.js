// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8081/api",
//   headers:{
//     'Content-Type' : 'application/json',
//   }, 
// });

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;


// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");  // ✅ check token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("✅ Token added to request:", token);  // Debug log
  } else {
    console.warn("❌ No token found in localStorage!");
  }
  return config;
});

export default api;
