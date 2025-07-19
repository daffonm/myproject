// Gets raw category and product data transform it into a class
// The final initialization is the transformed data where the user can edit or remove, but doesnt change the real data

import sampleProducts from "../db/products";
import categories from "../db/inventory";

class Category {
    constructor(id, name) {
        this.id = id
        this.name = name
        this.productList = []

        this.totalItem = 0
        this.totalStocks = 0
        this.totalCapital = 0
        this.totalPrice = 0
    }

    update = function(k, v) {
        this[k] = v
    }

    findProductById = function(id) {
        for (let index = 0; index < this.productList.length; index++) {
            if (this.productList[index].id === id) {
                return this.productList[index]
            }
        }
    }

    editProductById = function(id, k, v) {
        if (this.findProductById) {
            this.productList[id].update(k, v)
        }
    }

    addProduct = function(product) {
        this.productList.push(product)
        this.update("totalItem", this.totalItem + 1)
        this.update("totalStocks", this.totalStocks + product.quantity )
        this.update("totalCapital", this.totalCapital + product.capital)
        this.update("totalPrice", this.totalPrice + product.price)
    }

}


class Product {
    constructor(id, name, cat, qty, cp, prc, imgUrl = "") {
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





// This is the Meta Data
export default function initializeInventory(savedJSON = null) {

    const productList = null
    const newInventory = {}

    if (!savedJSON) {
        
        productList = sampleProducts
        newInventory = {
            onInventory : [],
            overAllItem : 0,
            overAllStocks : 0,
            overAllCapitals : 0,
            overAllPrice : 0,
    
            get : function (k) {
                return this[k]
            },
            update : function(k, v) {
                this[k] = v
            },
    
            getCategory : function(catname) {
                for (let index = 0; index < this.onInventory.length; index++) {
                    if (this.onInventory[index].name === catname) {
                        return this.onInventory[index]
                    }
                }
            },
    
            getAllProducts : function() {
                const newList = []
                this.onInventory.map((cat) => cat.productList.map((product) => newList.push(product)))
                return newList
            },
    
            getProductById : function(id) {
                const targetLoc = findProductLocation(id, this.onInventory)
                if (!targetLoc) return
                else return this.onInventory[targetLoc.catIndex].productList[targetLoc.productIndex]
            },
    
            updateProductById : function(id, newValues) {
                const targetLoc = findProductLocation(id, this.onInventory)
                if (!targetLoc) return
    
                const target = this.onInventory[targetLoc.catIndex].productList[targetLoc.productIndex]
                this.onInventory[targetLoc.catIndex].productList[targetLoc.productIndex] = {...target, ...newValues}
            }
        }
        
        for (let index = 0; index < categories.length; index++) {
            const category = categories[index]
    
            const newCategory = new Category(index, category.name)
    
            // filters fetched products into each categories name (referencing)
            // and create its own class
            filterAllProductsByCategory(productList, newCategory.name).map((filtered => {
                if (filtered !== null) {
    
                    newCategory.addProduct(new Product(
                        filtered.id, filtered.name, filtered.category, filtered.quantity,
                            filtered.capital, filtered.price))
                }
            }))
    
    
            // adds the category into the list
            newInventory.onInventory.push(newCategory)
            newInventory.overAllItem += newCategory.totalItem
            newInventory.overAllStocks += newCategory.totalStocks
            newInventory.overAllCapitals += newCategory.totalCapital
            newInventory.overAllPrice += newCategory.totalPrice
        }
    
        return newInventory
    }
    

}

// handlers
function filterAllProductsByCategory(productList, catname) {
    return productList.map((product, index) => product.category === catname? {...product, id:index} : null)
}

function findProductLocation(id, categoryList) {
  for (let catIndex = 0; catIndex < categoryList.length; catIndex++) {
    const productIndex = categoryList[catIndex].productList.findIndex(
      product => product.id === id
    );
    if (productIndex !== -1) return { catIndex, productIndex };
  }
 return null;
}
function unpackCategory(list) {
    const newList = []
    list.map((cat) => cat.productList.map((product) => newList.push(product)))
    return newList
}