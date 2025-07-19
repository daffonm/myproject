import React, { useState } from 'react';
import { ActivityButton } from './ActivityButton';

import trashIcon from "../assets/icons/trash-can.png"

const CartItem = ({ product , onAddtoCart}) => {
  const count = product.count

  return (
    <div className="cart-item">
        <div className="cart-wrapper">
            <div className="cart-item-image">
                <img src={product.imgUrl || null} alt="" />
            </div>
            <div className="cart-item-desc">
                <div className='item-desc-wrapper'>
                    <h5>{product.name}</h5>
                    <p>Jumlah : {count}</p>
                </div>
                <p>Rp. {count * product.price}</p>
            </div>
        </div>
        <div className="cart-cta-btns">
            <div className="quantity-control">
                <ActivityButton handleclick={() => onAddtoCart("onAddtoCart", product.id, 1)} cls={"q-btn q-add"}>+</ActivityButton>
                <ActivityButton handleclick={() => onAddtoCart("removeFromCart", product.id, 1)} cls={"q-btn q-min"}>-</ActivityButton>
            </div>
            <ActivityButton handleclick={() => onAddtoCart("removeFromCart", product.id, product.count)} cls={"q-del"}>
                <img className='trash-icon' src={trashIcon} alt="" />
            </ActivityButton>
        </div>
    </div>
  );
};

export default CartItem;
