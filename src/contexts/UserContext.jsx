import { createContext, useContext, useEffect, useRef, useState } from "react";

import sampleProducts from "../db/products";
import initializeInventory from "../structure/inventory";
import initializeTransaction from "../structure/transaction";
// import initializeInventory from "../structure/product"
import OverlayLayer from "../components/Overlay";



const debugMode = true



const UserContext = createContext();
export const useUserContext = () => useContext(UserContext);

export default function UserProvider({ children }) {

  const inventoryRef = useRef(null) // creates a ref that hold inv data
  const [invLoaded, setInvLoaded] = useState(false)


  const transactionRef = useRef(null) // creates a ref that hold transaction data
  const [transLoaded, setTransLoaded] = useState(false)


  const [, setRender] = useState(0)
  const render = () => setRender((n) => n + 1)


  // check Data for initial Load
  useEffect(() => {



    if (debugMode) { 
      console.log("Render..")
      localStorage.clear()
     }


    const savedInv = localStorage.getItem("inventory")

    if (savedInv) {
      console.log("Load Saved Inv Data")
      // If data exists in localStorage, use it
      inventoryRef.current = initializeInventory(JSON.parse(savedInv))
      setInvLoaded(true); // Mark that inventory has been loaded
    } else {
      console.log("creating new Inv Data")
      // If no saved data, initialize fresh inventory
      inventoryRef.current = initializeInventory(sampleProducts);
      setInvLoaded(true); // Mark that inventory has been loaded
    }
    
    const savedLog = localStorage.getItem("transaction")

    if (savedLog) {
      console.log("Load Saved Transaction Log")
      // If data exists in localStorage, use it
      transactionRef.current = initializeTransaction(JSON.parse(savedLog))
      setTransLoaded(true);
    } else {
      console.log("creating new Transaction Log")
      // If no saved data, initialize fresh log
      transactionRef.current = initializeTransaction([]);
      setTransLoaded(true); 
    }

  }, [])

  const dataStructure = {
    inventory : inventoryRef.current,
    invLoaded,

    updateInventory : function(newInventoryData) {
      inventoryRef.current = newInventoryData;
      localStorage.setItem("inventory", JSON.stringify(newInventoryData.productList)); // Save to localStorage, only saves the product data
     
    },
    
    transaction : transactionRef.current,
    transLoaded,

    updateTransaction : function(newLog) {
      inventoryRef.current = newLog;
      localStorage.setItem("transaction", JSON.stringify(newLog.transactionLog)); // Save to localStorage, only saves the product data
     
    },

    // creates transaction log on checkout
    createTransaction : function(cart) {
      return transactionRef.current.createTransaction(cart)
    }
  }


  const [overlayStack, setOverlayStack] = useState([]);
  
  const overlayMethods = {
    overlayStack,
    pushOverlay: function(name, props = {}) {
        setOverlayStack(prev => [...prev, { name, props }])
        },

    popOverlay : function() {
        setOverlayStack(prev => prev.slice(0, -1));
        },
    }
  
    const contextValues = {...dataStructure, ...overlayMethods}

  return (
    <UserContext.Provider value={contextValues}>
      {children}

      {/* Render overlays visually stacked */}
      <div className="overlay-stack-container">
        {overlayStack.map((overlay, index) => (
          <OverlayLayer
            key={index}
            name={overlay.name}
            props={overlay.props}
            isTop={index === overlayStack.length - 1}
            depth={index}
          />
        ))}
      </div>
    </UserContext.Provider>
  );
}