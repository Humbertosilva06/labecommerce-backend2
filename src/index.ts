import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { CATEGORY } from "./types";

// console.log(users, products, purchase)

createUser("Renato", "renato@email.com", "456789")
getAllUsers()
createProduct("P003","Brinco Feminino", 12.50, CATEGORY.ACCESSORIES)
getAllProducts()
console.log("produto por id",getProductById("P003"))
console.table(queryProductsByName("iphone"))
createPurchase("Renato", "P003", 3, 37.50)
console.log (getAllPurchasesFromUserId ("Renato"))