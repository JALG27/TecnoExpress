import React from "react";
import Layout from "./../components/Layout/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
const Contact = () => {
  return (
    <Layout title={"Contactame"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACTAME</h1>
          <p className="text-justify mt-2">
            Cualquier consulta, duda o informacion sobre algun producto o la pagina web 
            no dude en contactar en cualquier momento, estoy siempre disponible!
          </p>
          <p className="mt-3">
            <BiMailSend /> : johnnyluengogonzalez@hotmail.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 0424-6471012
          </p>
          <p className="mt-3">
            <BiSupport /> : No disponible (de momento)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
