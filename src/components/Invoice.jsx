import backIcon from "../assets/icons/arrow-right.png"
import { ActivityButton } from "./ActivityButton"

function ProductList({product}) {
    const productPriceCount = product.count * product.price
    return (
        <div className="invoice-product">
            <p className="invoice-medium-font align-start">{product.name}</p>
            <p className="invoice-medium-font align-center">{product.count}</p>
            <p className="invoice-medium-font align-end">{productPriceCount}</p>
        </div>
    )
}

function Invoice({transaction}) {
  
    const productList = transaction.productList
   
    const date = `${transaction.date.day}/${transaction.date.month}/${transaction.date.year}`

    return (
        <div className="invoice">

            <div className="invoice-header">
                <h3 className="invoice-huge-font">Toko Anda</h3>
                <p className="invoice-big-font">Jl. Alamat Rumah Anda Rt 3 Rw</p>
            </div>

            <div className="invoice-container">

                <div className="invoice-content invoice-top">
                    <div className="invoice-attribute">
                        <p className="invoice-big-font">Tanggal</p>
                        <p className="invoice-big-font">{date}</p>
                    </div>
                    <div className="invoice-attribute">
                        <p className="invoice-big-font">Nomor Transaksi</p>
                        <p className="invoice-big-font">{transaction.id}</p>
                    </div>
                </div>

                <div className="invoice-content invoice-details">
                    <p className="invoice-big-font invoice-dt">Detail Transaksi</p>
                    <div className="invoice-table">
                        <div className="invoice-table-top">
                            <p className="invoice-medium-font align-start">Nama Produk</p>
                            <p className="invoice-medium-font align-center">Jumlah</p>
                            <p className="invoice-medium-font align-end">Harga</p>
                        </div>
                        <div className="invoice-table-content">
                            {productList.map((product, index) => <ProductList key={index} product={product}/>)}
                        </div>
                        <div className="invoice-table-bottom">
                            <p className="invoice-medium-font">Total</p>
                            <p className="invoice-medium-font">{"Rp. " + transaction.totalPrice}</p>
                        </div>
                    </div>
                </div>

            </div>

            <div className="invoice-footer">
                <p className="invoice-medium-font">Powered by <span className="stock-brand">Stock</span><span className="ease">Ease</span></p>
                <p className="invoice-small-font stockease-footer">Manage and track your products easily. Enhance inventory visibility with real-time updates and analytics.</p>
            </div>

        </div>
    )
}

export default function InvoicePage ({transaction, onClose}) {
    return (
        <div className="invoice-bg">
            <div className="pd-header ovr-header inv-top">
                <ActivityButton cls={"back-btn"} handleclick={onClose}>
                    <img className="back-icon" src={backIcon} alt="" />
                </ActivityButton>
            </div>
            <Invoice transaction={transaction}/>

        </div>
    )
}