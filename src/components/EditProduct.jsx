import { useState } from "react"
import { ActivityButton } from "./ActivityButton"

import backIcon from "../assets/icons/arrow-right.png"
import plusRed from "../assets/icons/plus-red.png"
import trashIcon from "../assets/icons/trash-can.png"

function MainComponents({title, productData, onClose, onSave, type, onDelete},) {

    const [id, setId] = useState(productData.id)
    const [name, setName] = useState(productData.name)
    const [category, setCategory] = useState(productData.category)
    const [capital, setCapital] = useState(productData.capital)
    const [price, setPrice] = useState(productData.price)
    const [quantity, setQuantity] = useState(productData.quantity)
   
    
    const handleChange = (k, v) => {
        switch (k) {
            case "name":
                setName(v)
                break;
            case "category":
                setCategory(v)
                break;
            case "capital":
                setCapital(v)
                break;
            case "price":
                setPrice(v)
                break;
            case "quantity":
                setQuantity(v)
                break;
            default:
                break;
        }
    }


    return (
        <div className="product-config">
                    <div className="ovr-header edit-header pd-header">
                        <ActivityButton cls={"back-btn"} handleclick={onClose}>
                            <img className="back-icon" src={backIcon} alt="" />
                        </ActivityButton>
                    </div>
                    <div className="content">
                        <div className="content-title">
                            <h3>{title}</h3>
                            {type === "Edit" ? 
                            <ActivityButton 
                            cls={"delete-product"}
                            handleclick={() => onDelete(id)}>
                                <img className="trash-icon" src={trashIcon} alt="" />
                            </ActivityButton> : null}
                            
                        </div>
                        <div>
                            <div className="form-wrapper">
                                <div className="form">
                                    <p>Foto Produk</p>
                                    <div className="form-image">   
                                        <ActivityButton cls={"add-image"}>
                                            <img className="add-image-icon" src={plusRed} alt="" />
                                        </ActivityButton>
                                    </div>
                                </div>
                                <div className="form">
                                    <p>Nama Produk</p>
                                    <input type="text" name="nama-produk" id="1" onChange={(e) => handleChange("name", e.target.value)} value={name} />
                                </div>
                                <div className="form category-form">
                                    <p>Kategori</p>
                                    <input type="text" name="kategori-produk" id="1" onChange={(e) => handleChange("category", e.target.value)} value={category} />
                                </div>
                                <div className="form number-form">
                                    <p>Harga Beli</p>
                                    <input type="text" name="kapital-produk" id="1" onChange={(e) => handleChange("capital", e.target.value)} value={capital} />
                                </div>
                                <div className="form number-form">
                                    <p>Harga Jual</p>
                                    <input type="text" name="harga-produk" id="1" onChange={(e) => handleChange("price", e.target.value)} value={price} />
                                </div>
                                <div className="form number-form">
                                    <p>Stok Awal</p>
                                    <input type="text" name="stok-produk" id="1" onChange={(e) => handleChange("quantity", e.target.value)} value={quantity} />
                                </div>
                            </div>
                        </div>
                    </div>
                        <div className="details-cta">
                            <ActivityButton cls={"d-btns masuk-kasir"} handleclick={() => onSave({id, name, category, capital, price, quantity})}>Simpan</ActivityButton>
                            <ActivityButton cls={"d-btns d-edit"} handleclick={onClose} >Batal</ActivityButton>
                        </div>
                </div>
    )
}

export default function EditProduct({type, product, onClose, onSave, onDelete}) {
    if (type === "Edit") {
        return <MainComponents type={type} title={"Edit Produk"} onClose={onClose} productData={product} onSave={onSave} onDelete={onDelete}/>
    } else {
        return <MainComponents type={"Add"} title={"Tambah Produk"} onClose={onClose} productData={{name:"", category:"", capital:"", price:"", quantity:"", id:-1}} onSave={onSave}/>
    }
}