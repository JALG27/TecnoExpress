import { useState, useEffect } from "react";
import axiosInstance from "../utils/api/conexion";


export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //obtener categoria
  const getCategories = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/category/get-category");
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
