import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Derechos reservados &copy; Johnny Luengo</h1>
      <p className="text-center mt-3">
        <Link to="/about">Sobre mi</Link>|<Link to="/contact">Contactame</Link>|
        <Link to="/policy">Politicas de privacidad</Link>
      </p>
    </div>
  );
};

export default Footer;
