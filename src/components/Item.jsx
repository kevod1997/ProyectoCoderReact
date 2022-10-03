/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBagPlusFill } from "react-icons/bs";
import { useCart } from "../context/CartContext";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";

const Item = ({ product }) => {
  const { id, img, name, price, stock } = product;
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [compra, setCompra] = useState(1);
  const onAdd = () => {
    let purchase = {
      id,
      name,
      price,
      stock,
      img,
      quantity: compra,
    };
    addItem(purchase);
    alert("Agregaste el producto al carrito");
  };

  return (
    <>
      <ImageListItem className="cardsHome" key={product.img} style={{ margin: "3px" }}>
        <img
          className="imgCard"
          src={`${product.img}?w=248&fit=crop&auto=format`}
          srcSet={`${product.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={product.name}
          loading="lazy"
          style={{ objectFit: "fill", cursor: "pointer" }}
          onClick={() => navigate(`/detail/${id}`)}
        />
        <ImageListItemBar
          title={product.name}
          subtitle={`$ ${product.price}`}
          sx={{borderEndStartRadius: '15px', borderEndEndRadius:'15px'}}
          actionIcon={
            <IconButton
              sx={{ color: "rgba(255, 255, 255, 0.54)" }}
              aria-label={`info about ${product.price}`}
              onClick={()=> onAdd(setCompra +1)}
            >
              <BsFillBagPlusFill />
            </IconButton>
          }
        />
      </ImageListItem>
      {/* <div
        className="card text-center bg-dark animate__animated animate__fadeInUp"
        style={{ width: "18rem", margin: "20px" }}
      >
        <div className="overflow">
          <img src={img} className="card-img-top" style={{ width: "100%" }} />
        </div>
        <div className="card-body text-light">
          <h4 className="card-title d-flex justify-content-center">{name}</h4>
          <p className="card-text d-flex justify-content-center">
            Precio: ${price}
          </p>
          <div>
            <button
              className="btn btn-outline-light"
              style={{
                marginLeft: "25px",
                marginRight: "25px",
                marginBottom: "10px",
                marginTop: "5px",
              }}
              onClick={() => navigate(`/detail/${id}`)}
            >
              Ver más
            </button>
            <BsFillBagPlusFill
              style={{ cursor: "pointer" }}
              onClick={()=> onAdd(setCompra +1)}
            />
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Item;
