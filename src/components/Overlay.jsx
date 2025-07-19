import ProductDetails from "./ProductDetails";
import EditProduct from "./EditProduct";
import CashierCart from "./CashierCart";
import InvoicePage from "./Invoice";

import { ConfirmationNotice, AlertNotice } from "./Notice";

import { ConfirmModal } from "./PopupModal";



function DebugFrame({inventory}) {

  const logInventory = () => {
    console.log(inventory)
  }

  return (
    <div className="debug">
      <button onClick={logInventory}>Log Inventory</button>
      <button>Log</button>
      <button>Log</button>
    </div>
  )
}

export default function OverlayLayer({ name, props, isTop, depth }) {
  const zIndex = 1000 + depth;

  const getComponent = () => {
    switch (name) {
      case "ProductDetails":
        return <ProductDetails {...props} />;
      case "EditProduct":
        return <EditProduct {...props} />;
      case "CashierCart":
        return <CashierCart {...props} />;
      case "DebugFrame":
        return <DebugFrame {...props} />;
      case "ConfirmationNotice":
        return <ConfirmationNotice {...props} />;
      case "AlertNotice":
        return <AlertNotice {...props} />;
      case "InvoicePage":
        return <InvoicePage {...props} />;
      // add more here
      default:
        return null;
    }
  };

  return (
    <div
      className={`overlay-layer ${isTop ? "top" : "dimmed"}`}
      style={{ zIndex }}>
      {/* <div className="overlay-wrapper">{getComponent()}</div> */}
      {getComponent()}
    </div>
  )
}