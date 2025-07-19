import { useNavigate } from "react-router-dom"
import { useState } from "react"

// Import Data
import productHandler from "../db/inventory"

// Import Components
import { ActivityButton } from "../components/ActivityButton"
import SearchBar from "../components/SearchBar"
import InventoryItem from "../components/InventoryItem"
import DropdownBar from "../components/DropdownBar"

// Import PNG / JPG / Icons
import ClosePNG from "../assets/icons/close.png"


// Product and Category data construct
// const categorizeProducts = () => {

//     const newCategory = []
//     //   Create Category of All Items
    

//     for (let index = 0; index < categories.length; index++) {
//         const category = categories[index];
        
//         if (category.name === "Semua") {
//             category.products.push(sampleProducts)
//         } else {
//             getFilteredProductByCategoryName(category.name).map((item) => {
//                 if (item !== null) {
//                     category.products.push(item)
//                 }
//             })
//         }

//         newCategory.push(category)
//     }
//     return newCategory
// }
// const getFilteredProductByCategoryName = (catName) => sampleProducts.map((product) => product.category === catName? product : null)

export default function Inventory({}) {
    console.log(productHandler.getList())


    return (
        <div className="inventory">

            {/* Header */}
            <div className="header">
                <div className="top">
                    <ActivityButton cls={"go-back"}>
                        <img src={ClosePNG} alt="" />
                    </ActivityButton>
                    <div className="item-search">
                        <SearchBar />
                    </div>
                    <ActivityButton cls={"add-product-btn"}>
                        <p>Tambah Product</p>
                    </ActivityButton>
                </div>
                <div className="bottom">
                    <p>Kategori </p>
                    <DropdownBar options={categoryRegistry} 
                    handleChange={sortByCategory}
                    current={selectedCategory} 
                    />
                </div>
            </div>

            {/* Container */}
            <div className="product-container">
                {/* generate each product component with product data states */}
                {/* { findCategory(selectedCategory).products.map((product, index) => <InventoryItem key={index} product={product} handler={invHandler}/>) } */}
                { findCategory(selectedCategory).products.map((product, index) => console.log("lol"))}

               
            </div>


        </div>
    )
}