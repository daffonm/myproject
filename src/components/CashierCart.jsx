import React, { useState } from 'react';

import { ActivityButton } from './ActivityButton';
import CartItem from './CartItem';
import backIcon from "../assets/icons/arrow-right.png"

const CashierCart = ({cartList, totals, handler}) => {

  const [, setRend] = useState(0)

  const render = (name, ...args) => {
    handler[name](...args)
    setRend(prev => prev + 1)
  }

  
  return (
    <div className="cashier">
      <div className="cashier-top-wrapper">

        <div className="pd-header ovr-header cash-header">
                <ActivityButton cls={"back-btn"} handleclick={handler.onBackButton}>
                    <img className="back-icon" src={backIcon} alt="" />
                </ActivityButton>
                <h3>Kasir</h3>
            </div>
        
        <div className="cashier-content">

            { totals.totalCCount > 0? 
            <>
              <div className="top">
                <ActivityButton cls={"delete-all"} handleclick={() => render("removeAllFromCart")}>Hapus Semua</ActivityButton>
              </div>

              <div className="cashier-container">
                {cartList.map((product) => 
                <CartItem key={product.id} product={product} onAddtoCart={render}/>)}
              </div> 
            </> : 
            <p>Tidak ada produk dalam Kasir</p> }

        </div> 
      </div>

      <div className="cashier-info">

        <div className="cashier-totals">
          <div>
            <p>Total Produk</p>
            <h3>Total Harga</h3>
          </div>
          <div className='totals-right'>
            <p>{totals.totalCCount}</p>
            <h3>Rp. {totals.totalCPrice}</h3>
          </div>
        </div>

        <ActivityButton cls={"checkout"} handleclick={handler.onCheckout}>Lanjut</ActivityButton>
      </div>
    </div>
  )
};

export default CashierCart;
