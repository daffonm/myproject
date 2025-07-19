import { useState } from "react"
import { ActivityButton } from "./ActivityButton"

// Icons
import plusIcon from "../assets/icons/plus-white-icon.png"

import arrowRightIcon from "../assets/icons/arrow-right-icon.png"
import productIcon from "../assets/icons/product-icon.png"
import folderIcon from "../assets/icons/folder-icon.png"


export default function InventoryItem({product, handler}) {


    const id = product.id
    const name = product.name
    const category = product.category
    const quantity = product.quantity
    const capital = product.capital
    const price = product.price

    return (
        <div className="inventory-item">
            <div className="left">
                <div className="product-image">
                    <img src={product.imgUrl || null} alt="" />
                </div>
                <p className="item-name">
                    {"IDR. " + price}
                </p>
            </div>

            <div className="right">
                <div className="item-desc">
                        <p className="product-name">{name}</p>
                        <div className="stock">
                            <img src={folderIcon} alt="" />
                            <p className="fontItem">{category}</p>
                        </div>
                        <div className="stock">
                            <img src={productIcon} alt="" />
                            <p className="fontItem">stock {quantity}</p>
                        </div>
                </div>
                <div className="item-cta">
                    <div className="cta-btns">
                        <ActivityButton cls={"add-to-cart-btn"} handleclick={() => {handler.onAddtoCart(id)}}>
                            <img className="plus-add" src={plusIcon} alt="" />
                        </ActivityButton>
                        <ActivityButton cls={"product-details-btn"} handleclick={() => {handler.onProductDetails(id)}}>
                            <img className="arrow-right-icon-inv" src={arrowRightIcon} alt="" />
                        </ActivityButton>
                    </div>
                </div>
            </div>

        </div>
    )
}