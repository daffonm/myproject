import { ActivityButton } from "./ActivityButton"

import backIcon from "../assets/icons/arrow-right.png"

export default function ProductDetails({product, onEdit, onClose, onAddtoCart}) {
    
    return (
        <div className="product-details">
            <div className="pd-header ovr-header">
                <ActivityButton cls={"back-btn"} handleclick={onClose}>
                    <img className="back-icon" src={backIcon} alt="" />
                </ActivityButton>
            </div>
            <div className="details-content">
                <div className="details-wrapper">
                    <div className="details-img">
                        <img src={product.imgUrl} alt="" />
                    </div>
                    <div className="details-desc">

                        <div className="details-info">
                            <div className="number-box unit">
                                <p className="number">{product.quantity}</p>
                                <p>Unit</p>
                            </div>
                            <div className="number-box capital">
                                <p className="number">{"Rp." + product.capital}</p>
                                <p>Modal</p>
                            </div>
                            <div className="number-box price">
                                <p className="number">{"Rp." + product.price}</p>
                                <p>Harga</p>
                            </div>
                        </div>

                        <div className="details-title">
                            <p className="details-name">{product.name}</p>
                            <p className="details-category">{product.category}</p>
                        </div>
                    </div>
                </div>
                    <div className="details-cta">
                        <ActivityButton cls={"d-btns masuk-kasir"} handleclick={() => onAddtoCart(product.id, 1)} >Masukan ke Kasir</ActivityButton>
                        <ActivityButton cls={"d-btns d-edit"} handleclick={() => onEdit(product.id)} >Edit Produk</ActivityButton>
                    </div>
            </div>
        </div>
    )
}