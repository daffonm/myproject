class Product {
    constructor(id, name, cat, qty, cp, prc, imgUrl = null) {
        this.id = id
        this.name = name
        this.category = cat
        this.quantity = qty
        this.capital = cp
        this.price = prc

        this.imgUrl = imgUrl
    }

    update = function(k, v) {
        this[k] = v
    }
}

export default function initializeInventory(productData) {
    const categoryList = []
    const addToCategory = (product) => {
        const targetIndex = findFirstAttributeMatch("name", product.category, categoryList)
       
        if (categoryList[targetIndex]) {
            categoryList[targetIndex].productTypes += 1
            categoryList[targetIndex].totalPrice += product.price
            categoryList[targetIndex].totalCapital += product.capital
            categoryList[targetIndex].totalStocks += product.quantity
           
        } else {
            // creates new Category
            categoryList.push({
                name: product.category,
                productTypes: 1,
                totalPrice : product.price,
                totalCapital : product.capital,
                totalStocks : product.quantity,
            })
            
        }
    }

    const productList = productData.map((product, index) => {
        addToCategory(product)
        return new Product(index, product.name, product.category, product.quantity, product.capital, product.price, product.imgUrl) 
    })
    return {
        categoryList : categoryList,
        productList : productList,
        onCashier : [],
        totals : {
            totalCCount : 0,
            totalCPrice : 0,
        },

        createProduct : function(product) {
            const newId = this.productList.length
            
            addToCategory(product)
            this.productList.push(new Product(newId, product.name, product.category, product.quantity, product.capital, product.price, product.imgUrl))
        },

        updateProductById : function(id, newValues) {
            const target = this.productList[findFirstAttributeMatch("id", id, this.productList)]
            this.productList[findFirstAttributeMatch("id", id, this.productList)] = {...target, ...newValues}
        },

        deleteProductById : function(id) {
            const targetIndex = findFirstAttributeMatch("id", id, this.productList)
            if (targetIndex !== null) {
                console.log("Deleting " + this.productList[targetIndex].name + " from Inventory")
                this.productList.splice(targetIndex, 1)
                console.log("Product Deleted from Inventory")
                console.log(this.productList[targetIndex])  
            } else {
                console.log("Product not found...")
            }
        },

        getProductById : function(id) {
            return this.productList[findFirstAttributeMatch("id", id, this.productList)]
        },

        filterProductsByCategory : function(catname) {
            const filtered = []
            for (let i = 0; i < this.productList.length; i++) {
                if (this.productList[i].category === catname) {
                    filtered.push(this.productList[i])
                }
            }
            return filtered
        },

        filterProductByName : function(str) {
            return this.productList.filter(product => {
                return product.name.toLowerCase().startsWith(str.toLowerCase());  // Ensure case-insensitive search
            });
        },

        // cashier
        addProductToCashier : function(productId, count) {

            // check for product's stock
            const currentStock = this.getProductById(productId).quantity
            const subtract = currentStock - count
            if (subtract >= 0) {
                this.updateProductById(productId, {quantity : subtract})
                const targetIndex = findFirstAttributeMatch("id", productId, this.onCashier)
    
                // if this product not on cashier yet
                if (targetIndex === null) {
                    this.onCashier.push({...this.getProductById(productId), count: 0})
                }

                this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)].count += count
                this.totals.totalCCount += count
                this.totals.totalCPrice += this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)].price * count  
                return {available: true, product:this.getProductById(productId)} 
            } else {
                // if the stock is empty
                return {available: false, product:this.getProductById(productId)} 
            }
        },
        
        removeProductFromCashier : function(productId, count, keep) {
            const targetIndex = findFirstAttributeMatch("id", productId, this.onCashier)
            if (targetIndex === null) return

            this.totals.totalCCount -= count
            this.totals.totalCPrice -= this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)].price * count
            
            const subtracted = this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)].count - count
            
            if (subtracted <= 0) {
                console.log(this.onCashier[targetIndex].name + " Succesfully Deleted")
                this.onCashier.splice(targetIndex, 1)
            } else {
                this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)].count -= count
            }

            // add stocks back to inventory
            if (!keep) {
                const currentStock = this.getProductById(productId).quantity
                this.updateProductById(productId, {quantity : currentStock + count})
            }
        },

        removeAllProductFromCashier : function(keep) {
            console.log("Removing all products from cashier...");

            // Make a copy of the array so the original array isn't mutated while iterating
            const cartList = [...this.onCashier];

            // Loop through each product and remove it
            cartList.forEach((product) => { 
                console.log(`Removing product: ${product.name}`);
                
                // Remove the product from the cart
                this.removeProductFromCashier(product.id, product.count, keep);
            });

            // Ensure the updated cart is reflected
            console.log("All products removed from cashier.");
        },

        getCashierTotals : function() {
            
            let totalPrice = 0
            let totalCount = 0
            this.onCashier.map((product) => {
                totalPrice += product.price * product.count
                totalCount += product.count
            })
            return {totalPrice, totalCount}
        },

        getProductOnCashier : function(productId) {
            return this.onCashier[findFirstAttributeMatch("id", productId, this.onCashier)]
        },


    }
}

// handler
function findFirstAttributeMatch(key, value, arr) {
    for (let i = 0; i < arr.length; i++) {
        const target = arr[i]
        if (target[key] === value) {
            return i
        }   
    }
    return null
}