import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useState } from "react";
import { database } from "../firebase/firebase";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Checkout() {
  const [comprador, setComprador] = useState({});
  const [orderId, setOrderId] = useState("");
  const { cart, cartTotal, clearFinally } = useCart();
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const datosComprador = (e) => {
    setComprador({
      ...comprador,
      [e.target.name]: e.target.value,
    });
  };

  const finalizarCompra = (e) => {
    e.preventDefault();
    // const email = e.target.email.value;
    // const regexEmail =
    // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (Object.values(comprador).length !== 3) {
      toast.error("Tenes que completar todos los campos", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
      return;
    } 
  //    if(email !== '' || regexEmail.test(email)){
  //     toast.error("Email Invalido", {
  //       position: "bottom-center",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: false,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined,
  //     });
  //     return;
  // }
    else {
      setLoader(true);
      const ventas = collection(database, "orders");
      addDoc(ventas, {
        comprador,
        items: cart,
        total: cartTotal(),
        date: serverTimestamp(),
      })
        .then((res) => {
          setOrderId(res.id);
          clearFinally();
        })
        .catch((error) => console.log(error))
        .finally(() => setLoader(false));
    }
  };
  if (loader) {
    return (
      <div
        style={{
          backgroundColor: "#D3D3D3",
          backgroundImage:
            'url("https://img.freepik.com/premium-photo/fresh-homemade-wheat-bread-baking-from-rye-flour-top-view-rustic-style_187166-54561.jpg?w=1380")',
          paddingLeft: "250px",
          paddingRight: "255px",
          padding: "50px",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <p>
          <Loader />
        </p>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundColor: "#c9c9c9",
        backgroundImage:
          'url("https://img.freepik.com/premium-photo/fresh-homemade-wheat-bread-baking-from-rye-flour-top-view-rustic-style_187166-54561.jpg?w=1380")',
        paddingLeft: "250px",
        paddingRight: "255px",
        padding: "50px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {!orderId ? (
        <div
          className="checkoutBox card d-flex justify-content-center"
        >
          <div>
            <span className="d-flex justify-content-center">
              <h5
                style={{
                  borderBottom: "2px solid grey",
                  fontWeight: "inherit",
                }}
              >
                Por favor complete los siguientes campos
              </h5>
            </span>
          </div>
          <div className="containter inputBox">
            <form
              className="d-flex justify-content-center"
              onSubmit={finalizarCompra}
            >
              <ToastContainer />
              <div className="row">
                <div
                  className="col-12"
                  style={{ marginBottom: "20px" }}
                  ><div className="itemCheckout d-flex justify-content-center">
                  <input
                    style={{ margin: "5px", width:'145%' }}
                    type="text"
                    placeholder="Ingresa tu nombre y apellido"
                    name="name"
                    onChange={datosComprador}
                  />
                  </div>
                <div className="itemCheckout d-flex justify-content-center">
                  <input
                    style={{ margin: "5px", width:'145%' }}
                    type="number"
                    placeholder="Ingresa tu telefono"
                    name="phone"
                    onChange={datosComprador}
                  />
                </div>
                <div className="itemCheckout d-flex justify-content-center">
                  <input
                    style={{ margin: "5px", width:'145%' }}
                    type="email"
                    placeholder="Ingresa tu correo"
                    name="email"
                    onChange={datosComprador}
                  />
                </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button
                    style={{ marginBottom: "25px" }}
                    type="submit"
                    className="btn btn-outline-dark d-flex justify-content-center "
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        //MODIFICAR CON MEDIAQUERY PARA QUE QUEDE RESPONSIVE!!
        <div
        className="finalMessageBox d-flex flex-column justify-content-center"
        >
          <div className="finalMessage1 col-12 d-flex justify-content-center">
          <h4 >Gracias por tu compra! </h4>
          </div>
          <div className="finalMessage2 col-12 d-flex justify-content-center">
          <p className="message">En el plazo de 24hs nos vamos a comunicar para coordinar el retiro del producto. Ante cualquier inconveniente podes comunicarte con nosotros por nuestras redes</p>
          </div>
          <div className="col-12 d-flex justify-content-center">
          <button
            className="btn btn-dark"
            onClick={() => navigate("/")}
            style={{margin:'15px 0px'}}
          >
            {" "}
            Volver
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
