import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

// Contexts
import { useUserContext } from "../contexts/UserContext"

// Import Data Structure
// import initializeInventory from "../Inactive/product"

// Import Components
import { ActivityButton } from "../components/ActivityButton"
import SearchBar from "../components/SearchBar"
import InventoryItem from "../components/InventoryItem"
import DropdownBar from "../components/DropdownBar"

// Import PNG / JPG / Icons
import ClosePNG from "../assets/icons/arrow-right.png"
import CashierIcon from "../assets/icons/cashier-white-icon.png"
import deleteProductIcon from "../assets/icons/delete-product.png"
import shoppingCart from "../assets/icons/shopping-cart.png"
import invoiceIcon from "../assets/icons/invoice-icon.png"

export default function Inventory() {

    // forceRender
    const [, forceRender] = useState(0)
    const render = () => {
        forceRender(n => n + 1)
    }   
    
    // Page Navigation
    const navigate = useNavigate()
    const location = useLocation()

    // Context Setup
    const { inventory, updateInventory, createTransaction, pushOverlay, popOverlay } = useUserContext()


    // Sorting Handlers
    const [seachQuery, setSearchQuery] = useState(location.state || "")
    const [selectedCategory, setSelectedCategory] = useState("Semua")
    const sortByCategory = (name) => {
        setSelectedCategory(name)
    }
    const displayCategory = () => inventory.filterProductsByCategory(selectedCategory).map((product) => <InventoryItem key={product.id} product={product} handler={{onAddtoCart, onProductDetails}}/>)
    const displayAll = () => inventory.productList.map((product) => <InventoryItem key={product.id} product={product} handler={{onAddtoCart, onProductDetails}}/>)
    const displayQuery = (filteredProduct) => filteredProduct.map((product) => <InventoryItem key={product.id} product={product} handler={{onAddtoCart, onProductDetails}}/>)
    
    // Search Bar Filtering
    const onProductSearchTyping = (letter) => {
        setSearchQuery(letter)
    }


    // CTA Callbacks
    const createNewProduct = (newValues) => {
        inventory.createProduct(newValues)
        updateInventory(inventory)
        popOverlay()
    }

    const saveProduct = (newValues) => {
        inventory.updateProductById(newValues.id, newValues)
        updateInventory(inventory)
        popOverlay()
        popOverlay()
    }

    const deleteProduct = (id) => {
        const deletion = (productId) => {
            inventory.deleteProductById(productId)
            updateInventory(inventory)
            popOverlay()
            popOverlay()
            popOverlay() 
        }
        pushOverlay("ConfirmationNotice", {
            img: deleteProductIcon,
            title: "Hapus Produk ini?",
            message: "Apakah anda yakin untuk menghapus Produk ini?",
            submessage: "Data mengenai penjualan produk ini tetap tersimpan bila telah terjadi transaksi sebelumnya",
            buttonMessage: "Hapus Produk",
            cancelMessage: "Batal",
            onConfirmation: () => deletion(id),
            onCancel : () => popOverlay()
        })
    }

    // CTA Button Handlers
    const onAddProduct = () => {
        // pushOverlay("DebugFrame", {inventory: inventory})   
        pushOverlay("EditProduct", {type:"Create", onClose: popOverlay, onSave: createNewProduct})
    }
    
    const onBackButton = () => {
        popOverlay()
    }

    const onEdit = (id) => {
        const targetProduct = inventory.getProductOnCashier(id)
        if (!targetProduct) {
            pushOverlay("EditProduct", 
                {
                    type:"Edit",
                    product: inventory.getProductById(id), 
                    onClose: popOverlay,
                    onSave: saveProduct, onDelete: deleteProduct,
                })
        } else {
            pushOverlay("AlertNotice", {
            img: shoppingCart,
            title: "Produk ini berada dalam Kasir",
            message: "Anda tidak bisa edit produk yang sedang di kasir",
            submessage: "Mohon selesaikan atau kosongkan produk ini di dalam kasir untuk lanjut ke laman edit",
            buttonMessage: "Ok",
            onConfirmation: () => popOverlay(),
            })
        }
    }
    
    const onProductDetails = (id) => {
        pushOverlay("ProductDetails", 
            {
                product: inventory.getProductById(id), 
                onClose : popOverlay,
                onEdit: onEdit, 
                onAddtoCart : onAddtoCart,
            })
    }


    const onAddtoCart = (id, count = 1) => {
        const result = inventory.addProductToCashier(id, count)
        render()

        if (!result.available) {
            pushOverlay("AlertNotice", {
            img: shoppingCart,
            title: "Stok Barangmu telah habis...",
            message: "Produk " + result.product.name +  " telah kehabisan stok,",
            submessage: "Periksa kembali produkmu. jika terjadi kesalahan, batalkan transaksi dan ubah jumlah stok produk anda",
            buttonMessage: "Ok",
            onConfirmation: () => popOverlay(),
            })
        }
    }
    
    const removeFromCart = (id, count) => {
        inventory.removeProductFromCashier(id, count)
        render()
    }

    const removeAllFromCart = (unstock) => {
        inventory.removeAllProductFromCashier(unstock)
        render()
    }

    const onCartButton = () => {
        
        pushOverlay("CashierCart", 
            {
                cartList : inventory.onCashier, 
                totals : inventory.totals,
                handler: {
                    onAddtoCart,
                    onBackButton,
                    removeFromCart,
                    removeAllFromCart,
                    onCheckout,
                }
            })
    }

    const onCheckout = () => { 
        const Checkout = () => {
            popOverlay()
            const productList = [...inventory.onCashier]
            const newTransaction = createTransaction({
                productList: productList,
                totalCount: inventory.getCashierTotals().totalCount,
                totalPrice: inventory.getCashierTotals().totalPrice,
            })
            pushOverlay("InvoicePage", {
                transaction: newTransaction,
                onClose: () => popOverlay()
                })

            removeAllFromCart(true)
        }

        if (inventory.onCashier.length > 0) {
            pushOverlay("ConfirmationNotice", {
            img: invoiceIcon,
            title: "Buat Transaksi?",
            message: "Melanjutkan ke pembuatan struk dan invoice",
            submessage: "Periksalah kembali produk - produk anda. Setelah membuat transaksi, Jumlah stok produk anda akan berkurang",
            buttonMessage: "Buat Transaksi",
            cancelMessage: "Batal",
            onConfirmation: () => Checkout(),
            onCancel : () => popOverlay()
        })
        } else {
            return
        }
    }


    return (
        <div className="inventory">

            {/* Header */}
            <div className="header">
                <div className="top">
                    <ActivityButton cls={"go-back"} handleclick={() => navigate('/')}>
                        <img src={ClosePNG} alt="" />
                    </ActivityButton>
                    <div className="item-search">
                        <SearchBar handlechange={onProductSearchTyping} initial={seachQuery}/>
                    </div>
                    <ActivityButton cls={"add-product-btn"} handleclick={onAddProduct}>
                        <p>Tambah Product</p>
                    </ActivityButton>
                </div>
                <div className="bottom">
                    <p>Kategori </p>
                    <DropdownBar 
                    options={inventory.categoryList}
                    handleChange={sortByCategory}
                    current={selectedCategory} 
                    />
                </div>
            </div>

            {/* Container */}
            <div className="product-container">
                {/* generate each product component within structure */}
                {
                    seachQuery !== "" ? displayQuery(inventory.filterProductByName(seachQuery)) : selectedCategory === "Semua"? displayAll() : displayCategory()}
            </div>




            {/* Cashier Cart */}
            {inventory.getCashierTotals().totalCount >= 1 ? 
                <ActivityButton cls={"cashier-btn"} handleclick={onCartButton}>
                    <div className="img-container-cashier">
                        <img src={CashierIcon} alt="" />
                        <p className="cashier-count">{inventory.getCashierTotals().totalCount}</p>
                    </div>
                </ActivityButton> : null}



        </div>
    )
}