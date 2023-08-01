import React from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/search";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const Search = () => {
  const navigate = useNavigate();
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No se encontraron productos"
              : `Encontrado ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`${process.env.REACT_APP_PORT_BACK}/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p> 
                  <p className="card-text"> $ {p.price}</p>
                  <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Mas detalles
                    </button>
                  <button
                      className="btn btn-dark ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Producto añadido al carrito");
                      }}
                    >
                      AÑADIR AL CARRITO
                    </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
