import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"Sobre mi - TecnoExpress"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            Gracias a mi formacion especializada, considero que puedo aportar
            valor y seguir desarrollandome profesionalmente en una compañia que
            coincida con mis valores y expectativas, de forma que el cumplimiento
            de las normas y las exigencias expuestos en el desarrollo de el sitio web
            se lleve de forma exitosa hasta el final.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
