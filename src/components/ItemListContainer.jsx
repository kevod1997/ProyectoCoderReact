import React from "react";

const ItemListContainer = ({ saludo }) => {
  //   console.log(props);
  //   const{saludo}=props

  return (
    <div className="itemContainer">
      <h1> {saludo} </h1>
    </div>
  );
};

export default ItemListContainer;
