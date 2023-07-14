import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Politica de privacidad"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>El administrador se compromete a proteger la privacidad de los usuarios</p>
          <p>Al acceder o utilizar el servicio, usted indica que ha leido y comprendido y aceptado nuestra recopilacion y
            almacenamiento de su informacion personal 
          </p>
          <p>Cualquier informacion recopilada de usted se utiliza de manera, para personalizacion de su experiencia y
            para mejora constante de la plataforma
          </p>
          <p>Se reserva el derecho de transferir informacion a un tercero en el caso de una venta,fusion u otra 
            transferencia de todos los activos de TecnoExpress
          </p>
          <p>Se conservara su informacion solo mientras la necesitemos para proporcionarle a la empresa TecnoExpress y 
            cumplir con los propositos descritos en esta politica
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
