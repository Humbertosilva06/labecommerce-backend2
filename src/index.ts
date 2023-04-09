import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";

import express, {Request, Response, response} from "express"
import cors from "cors"
import { TUser, TProduct, CATEGORY } from "./types";
import { TPurchase } from "./types";

//inciar servidor na porta 3003


// console.log(users, products, purchase)

createUser("Renato", "renato@email.com", "456789")
getAllUsers()
createProduct("P003","Brinco Feminino", 12.50, CATEGORY.ACCESSORIES)
getAllProducts()
console.log("produto por id",getProductById("P003"))
console.table(queryProductsByName("iphone"))
createPurchase("Renato", "P003", 3, 37.50)
console.log (getAllPurchasesFromUserId ("Renato"))

//inciar servidor na porta 3003
const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, ()=>{
    console.log ("servidor rodando na porta 3003")
})

app.get ("/ping", (req:Request, res:Response)=>{
    res.send("pong")  

})


//endpoints
// POST
//createUser (cria um usuario na lista users)

app.post("/users", (req:Request, res:Response)=>{

    const id: string =req.body.id
    const email:string = req.body.email
    const password:string = req.body.password

    const newUser: TUser = {id, email,password}

    users.push(newUser)
    console.log("usuarios", users)
    res.status(201).send("usuario incluido com sucesso")

    

})

//createProduct (cria um novo produto na lista deprodutos)

app.post("/products", (req:Request, res:Response)=>{
    const id:string = req.body.id
    const name:string = req.body.name
    const price:number = req.body.price
    const category:CATEGORY = req.body.category

    const newProduct: TProduct = {id, name, price, category}

    products.push(newProduct)
    console.log("endpoint lista dosprodutos", products)
    
    res.status(201).send("produto incluido com sucesso")
    
})

//cretePuchase (cria uma nova compra)

app.post ("/purchases", (req:Request, res:Response)=>{
    const userId: string = req.body.userId
    const productId: string = req.body.productId
    const quantity: number = req.body.quantity
    const totalPrice:number = req.body.totalPrice

    const newPurchase: TPurchase = {userId, productId, quantity, totalPrice}


    purchase.push(newPurchase)
    console.log("endpoint lista de compras", purchase)

    res.status(201).send("nova compra incluida com sucesso")
    
})

// GET
//getAllUsers (lista todos os usuarios da lista)

app.get ("/users", (req:Request, res:Response)=>{
    res.status(200).send(users)
})

// getAllProducts (lista todos os produtos)

app.get ("/products", (req:Request, res:Response)=>{
    res.status(200).send(products)
})

//searchProductbyName

app.get ("/products/search", (req:Request, res:Response)=>{

    const q = req.query.q as string

    const result = q?
    products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
    :
    products

    res.status(200).send(result)

})

//getProductsbyID

app.get ("/products/:id", (req:Request, res:Response)=>{

    const id = req.params.id as string

    const result = products.find((product)=> product.id === id)

    res.status(200).send(result)

})

//getUserPurchasesByID

app.get("/users/:id/purchases", (req:Request, res:Response)=>{

    const id:string = req.params.id

    const result = purchase.filter((purchase)=> purchase.userId.toLowerCase() === id.toLowerCase())

    res.status(200).send(result)

})


//PUT

//edituserByID (edita os dados de um usuario)

app.put("/users/:id", (req:Request, res:Response)=>{

    const id:string = req.params.id
    const newEmail:string | undefined = req.body.email
    const newPassword:string | undefined = req.body.password
    
    const searchUser:TUser | undefined = users.find((user)=> user.id === id)
    console.log("antes da edição", searchUser)
    if(searchUser){
        searchUser.email = newEmail || searchUser.email
        searchUser.password = newPassword || searchUser.password
    }
    console.log("apos edição", searchUser);
    

    res.status(201).send("usuarios editado com sucesso")


})

//editProductById (edita um produto)

app.put("/products/:id", (req:Request, res:Response)=>{

    const id:string = req.params.id
    const newName:string | undefined = req.body.name
    const newPrice:number | undefined = req.body.price
    const newCategory:CATEGORY | undefined = req.body.category
    
    const searchProduct:TProduct | undefined = products.find((product)=> product.id === id)
    console.log("produto antes da edição", searchProduct)
    if(searchProduct){
        searchProduct.name = newName || searchProduct.name
        searchProduct.price = isNaN(newPrice)? searchProduct.price : newPrice
        searchProduct.category = newCategory || searchProduct.category

    }
    console.log("produto apos edição", searchProduct)

    res.status(201).send("produto editado com sucesso")

})

//DELETE

//delteUserById (deleta um usuario )

app.delete("/users/:id", (req:Request, res:Response)=>{

    const id:string = req.params.id

    const findUser = users.findIndex((user)=>user.id === id)
    let message:String = "usuario deletado"
    if(findUser>=0){

        users.splice(findUser,1)
    }else{
        message="usuario não encontrado"
    }

    res.status(200).send(message)

})

//dleteProductById (deleta um produto)

app.delete("/products/:id", (req:Request, res:Response)=>{

    const id:string = req.params.id

    const findProduct = products.findIndex((product)=>product.id === id)
    let message:String = "produto deletado"
    if(findProduct>=0){

        products.splice(findProduct,1)
    }else{
        message="produto não encontrado"
    }

    res.status(200).send(message)

})