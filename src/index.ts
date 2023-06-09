import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";

import express, { Request, Response, response } from "express"
import cors from "cors"
import { TUser, TProduct, CATEGORY } from "./types";
import { TPurchase } from "./types";
import { db } from "./database/knex";
import { error } from "console";
import { type } from "os";
import { stringify } from "querystring";
import { serialize } from "v8";

const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong")

})




// POSTS

//User

app.post("/users", async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id
        const name: string | undefined = req.body.name
        const email: string | undefined = req.body.email
        const password: string | undefined = req.body.password
        //validação de id
        if (id !== undefined) {
            if (typeof id === "string") {
                // const [verifyIfIdExists] = await db.raw(`
                //     SELECT * FROM users
                //     WHERE id = "${id}";                    
                // `)

                //refatorado query builder
                const [verifyIfIdExists] = await db("users").where({id:id})

                console.log("teste user knex",verifyIfIdExists)
                if (verifyIfIdExists) {
                    res.status(400)
                    throw new Error("ja existe um usuario com o mesmo id, envie outro valor")
                }
                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do usuario deve ter pelo menos 4 caracteres, começando pela letra u minicusula")
                }
                if (id[0] !== "u") {
                    res.status(400)
                    throw new Error("o primeiro caracetere da id devee ser a letra u minuscula")
                }
            } else {
                res.status(400)
                throw new Error("o id deve ser uma string")
            }

        } else {
            res.status(400)
            throw new Error("o id deve ser um valor valido")
        }

        //validação name
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("o nome deve estar em string")

            }

        } else {
            res.status(400)
            throw new Error("o name deve ser um valor valido")
        }

        //validação do email
        if (email !== undefined) {
            if (typeof email === "string") {
                // const [verifyIfEmailExist] = await db.raw(`
                // SELECT * FROM users
                // WHERE email = "${email}"; 
                // `)

                //refatorado query builder
                const [verifyIfEmailExist] = await db("users").where({email:email})
                if (verifyIfEmailExist) {
                    res.status(400)
                    throw new Error("ja existe um usuario com o mesmo email, envie um email diferente")
                }
            } else {
                res.status(400)
                throw new Error("o email deve ser uma string")
            }

        } else {
            res.status(400)
            throw new Error("o email deve ser um valor valido")
        }

        //validação password
        if (password !== undefined) {
            if (typeof password !== "string") {
                res.status(400)
                throw new Error("O password deve ser uma string")

            }

        } else {
            res.status(400)
            throw new Error("o password deve ser um valor valido")
        }

        // await db.raw(`
        // INSERT INTO users (id, name, email, password)
        // VALUES
        // ("${id}", "${name}", "${email}", "${password}");
        
        // `)

        //refatorado query builder

        const newUser ={
            id:id,
            name:name,
            email:email,
            password:password
        }
        
        await db("users").insert(newUser)
        res.status(201).send("usuario incluido com sucesso")
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//Product 

app.post("/products", async (req: Request, res: Response) => {

    try {
        const id: string | undefined = req.body.id
        const name: string | undefined = req.body.name
        const price: number | undefined = req.body.price
        const category: CATEGORY | undefined = req.body.category
        const description: string | undefined = req.body.description
        const imageUrl: string | undefined = req.body.imageUrl

        //validação id do produto (se o id não é undefined, se é string, se possui 4 caracteres no minimo e se o primeiro caraceter é a letra P maisucula)
        if (id !== undefined) {
            if (typeof id === "string") {
                // const [searchProductId] = await db.raw(`
                //     SELECT * FROM products
                //     WHERE id = "${id}"                
                // `)

                //refatorado query builder
                const [searchProductId] = await db("products").where({id:id})

                
                if (searchProductId) {
                    res.status(400)
                    throw new Error("ja existe um produto com o mesmo id, cadastre um valor diferente")
                }
                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do produto deve possuir pelo menos 4 caracteres, o primeiro sendo a letra P maiuscula")
                }
                if (id[0] !== "P") {
                    res.status(400)
                    throw new Error("o primeiro caractere do id deve ser a letra P maiuscula ")
                }

            }

        } else {
            res.status(400)
            throw new Error("o id deve ser um valor valido")
        }

        //validação name

        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(400)
                throw new Error("o nome do produto deve ser em string")
            }

        } else {
            res.status(400)
            throw new Error("nome invalido, insira um valor")
        }

        //validação price

        if (price !== undefined) {
            if (typeof price !== "number") {
                res.status(400)
                throw new Error("valor invalido, o preco deve ser um numero")
            }

        } else {
            res.status(400)
            throw new Error("preço invalido, insira um valor valido")
        }

        //validação category

        if (category !== undefined) {
            if (category !== CATEGORY.ACCESSORIES && category !== CATEGORY.CLOTHES_AND_SHOES && category !== CATEGORY.ELECTRONICS) {
                res.status(400)
                throw new Error("categoria invalida, escolha entre Acessórios, Roupas e calçados ou Eletrônicos")

            }

        } else {
            res.status(400)
            throw new Error("Categoria invalida, insiria uma categoria valida")

        }

        //validação description

        if (description !== undefined) {
            if (typeof description !== "string") {
                res.status(400)
                throw new Error("valor invalido, a descrição deve ser um  texto")
            }

        } else {
            res.status(400)
            throw new Error("descriçãoinvalido, insira um valor valido")
        }

        // validação imagem

        if (imageUrl !== undefined) {
            if (typeof imageUrl !== "string") {
                res.status(400)
                throw new Error("valor invalido, a URL da imagem deve ser uma string")
            }

        } else {
            res.status(400)
            throw new Error("URL da imagem invalida, insira um valor valido")
        }

    //    await db.raw(`
    //         INSERT INTO products (id, name, price, category, description, "imageUrl")
    //         VALUES
    //         ("${id}", "${name}", "${price}", "${category}", "${description}", "${imageUrl}");
       
    //    `)

    //refatroado com query builder
        const newProduct = {
            id:id,
            name:name,
            price:price,
            category:category,
            description:description,
            imageUrl:imageUrl
        }

        await db("products").insert(newProduct)

        console.log("endpoint lista dosprodutos")

        res.status(201).send("produto incluido com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//Purchase  

app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const buyer: string = req.body.buyer
        const total_price: number = req.body.totalPrice
        const paid: number = req.body.paid     
        const purchase_id: string = Math.floor(Date.now() * Math.random()).toString(36)
        const product_id: string = req.body.product_id
        const quantity: number = req.body.quantity
         

        //validação do buyer
        if (buyer !== undefined) {
            if (typeof buyer=== "string") {
               
                const [searchIfBuyerIsRegistered] = await db("users").where({id:buyer})


                if (!searchIfBuyerIsRegistered) {
                    res.status(400)
                    throw new Error("id do comprador não encontrado, por favor, cadastre-se")
                }

            } else {
                res.status(400)
                throw new Error("id do comprador em formato invalido, deve ser uma string")
            }

        } else {
            res.status(400)
            throw new Error("id invalido, insira um id valido")
        }

        //validação totalprice
        if (total_price !== undefined) {
            if (typeof total_price !== "number") {
                res.status(400)
                throw new Error("tipo de valor invalido, insira o valor no formato number")
            }

        } else {
            res.status(400)
            throw new Error("valor de quantidade invalido, insira um valor valido")
        }

        //validação paid

        if (paid !== undefined){
            if(typeof paid !== "number"){
                res.status(400)
                throw new Error("valor deve ser o numero 1 para pago e 0 para não pago")              

            }
            

        }else{
            res.status(400)
            throw new Error("valor de paid invalido, insira um valor no formato number")
        }

        // validação porduct_id 

        

        
        if ( product_id!== undefined) {          
            if (typeof product_id !== "string" ) {
                res.status(400)
                throw new Error("tipo de valor de product_id invalido, insira o valor no formato string")
            }

            if(product_id.length < 4){
                res.status(400)
                throw new Error("id do produto deve ter ao menos 4 caracteres e começar com a letra 'P' maiuscula")
            }

                 

            if(product_id[0] !== "P"){
                res.status(400)
                throw new Error("Primeiro carctere do id de produto deve ser a letra 'P' maisucula")
            }

            const verifyIfProductExist = await db("products").where({id:product_id})
            
            if(!verifyIfProductExist){
                res.status(400)
                throw new Error("indira um Id de produto existente")
            }

        } else {
            res.status(400)
            throw new Error("valor de produto invalido, insira um valor valido")
        }

        //verificação quantity
        
        if (quantity !== undefined) {
            if(typeof quantity !== "number"){
                res.status(400)
                throw new Error("tipo de valor de quantity invalido, insira o valor no formato number")
            }

        } else {
            res.status(400)
            throw new Error("valor de quantidade invalido, insira um valor ")
        }       


        const newPurchase ={
            id: purchase_id,
            buyer:buyer,
            total_price: total_price,
            paid:paid
        }
        

        const newPurchaseProduct = {
            purchase_id: purchase_id,
            product_id:product_id,
            quantity:quantity
        }
        await db("purchases").insert(newPurchase)

        await db("purchase_products").insert(newPurchaseProduct)

        
        res.status(201).send("nova compra incluida com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

// GET 
//AllUsers 

app.get("/users", async (req: Request, res: Response) => {
        try {

            const result = await db("users")
            res.status(200).send(result)
        } catch (err) {
    
            if (res.statusCode === 200) {
                res.status(500)
            }
    
            console.log(err)
            res.send(err.message)
    
        }
    })

//AllProducts  

app.get("/products", async (req: Request, res: Response) => {
    try {

        const result = await db("products")
        res.status(200).send(result)
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//ProductbyName

app.get("/products/search", async (req: Request, res: Response) => {

    try {
        
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400)
            throw new Error("a query deve possuir mais de 1 caractere")
        }

       
        const result = await db("products")
        .where("name", "LIKE", `%${q}%`)

        res.status(200).send(result)
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//ProductsbyID 

app.get("/products/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string

        if (id.length < 4) {
            res.status(400)
            throw new Error("a id deve ter no minimo 4 caracteres e deve começar com a letra P maisucula")
        }
        if (id[0] !== "P") {
            res.status(400)
            throw new Error("a id deve começar com a letra P maiscula e ter 4 caracertese no minimo")
        }
       
        const [result] = await db("products").where({id:id})

        //validação da existencia do produto
        if (!result) {
            res.status(400)
            throw new Error("porduto não existente")
        }

        res.status(200).send(result)
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//UserPurchasesByID 


app.get("/users/:id/purchases", async (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        //validação existencia do usuario

        if (id !== undefined) {
            if (typeof id === "string") {
                
                const searchUser = await db("users").where({id:id})

                if (!searchUser) {
                    res.status(400)
                    throw new Error("usuario não encontrado, forneça um id existente")
                }
            }

        } else {
            res.status(400)
            throw new Error("id invalida, insira um formato valido")
        }

            
            const [result] = await db("purchases")
            .select(
                "purchases.id AS IdCompra",
                "purchases.total_price AS TotalCompra",
                "purchases.created_at AS dataCompra",
                "purchases.paid AS statusPagamento",
                "users.id AS idCOmprador",
                "users.email AS emailComprador",
                "users.name AS nomeComprador"
            )
            .where({buyer:id})
            .innerJoin("users", "purchases.buyer", "=", "users.id")
            
            
           
            if(!result){
                throw new Error("usuariuo nao tem compra")
            }

        res.status(200).send(result)
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})


// PURCHASES BY ID
app.get("/purchases/:id", async (req: Request, res: Response) => {

    try {
       
        const idCompra = req.params.id

        console.log("valor do id por pArams", idCompra)
        if(idCompra){

        const [buscarCompra] = await db("purchases").where({id:idCompra})

        if(!buscarCompra ){
            res.status(400)
            throw new Error("compra não encontrada")
        }
    }

    const [result] = await db("purchases")
    .select(
      "purchases.id",
      "purchases.total_price AS TotalCompra",
      "purchases.created_at AS dataCompra",
      "purchases.paid AS statusPagamento",
      "users.id AS numeroComprador",
      "users.email AS emailComprador",
      "users.name AS nomeComprador"
    )
    .innerJoin("users", "purchases.buyer", "=", "users.id")  
    .where({"purchases.id":idCompra}) 
    //OBS: nesse where eu coloquei o purchases:id em forma de string, em vez de id:idCompra. Isso pq esta dando um erro de ambiguidades, provavelmente pq as duas tabelas (users e purhchases) tem a propriedade id, mesmo com alias não funcionou.
    
    const [result2] = await db ("purchase_products")
    .select(
        "products.id AS idProduto",
        "products.name AS nomeProduto",
        "products.price AS preço",
        "products.category AS categoria",
        "products.description AS descrição",
        "products.imageUrl AS imagem"
    )
    .where({purchase_id:idCompra})
    .innerJoin("products", "purchase_products.product_id", "=", "products.id")

        
    res.status(200).send({result, productlist: result2})
   

    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//PUT

//userByID 

app.put("/users/:id", async(req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const newName: string = req.body.name
        const newEmail: string | undefined = req.body.email
        const newPassword: string | undefined = req.body.password

        //validação id

        if (id) {
            if (typeof id === "string") {
                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do usuario deve ter pelo menos 4 caracteres, começando pela letra u minicusula")
                }
                if (id[0] !== "u") {
                    res.status(400)
                    throw new Error("o primeiro caracetere da id deve ser aletra u minuscula")
                }
            } else {
                res.status(400)
                throw new Error("o id deve ser uma string")
            }

            //validação name
            if (newName) {
                if (typeof newName !== "string") {
                    res.status(400)
                    throw new Error("o nome deve ser uma string")
                }
            }

            //validação email
            if (newEmail) {
                if (typeof newEmail !== "string") {
                    res.status(400)
                    throw new Error("o email deve estar no formato string")
                }
            }

            //validação password
            if (newPassword) {
                if (typeof newPassword !== "string") {
                    res.status(400)
                    throw new Error("o password deve estar no formato string")
                }
            }


            const [searchUser] = await db("users").where({id:id})

            //validação ususario
            if (searchUser === undefined) {
                res.status(400)
                throw new Error("usuario não encontrado")
            }

            console.log("antes da edição", searchUser)
            if (searchUser) {

                const updatedUser = {
                    name: newName || searchUser.name,
                    email: newEmail || searchUser.email,
                    password: newPassword || searchUser.password
                }

                await db("users").update(updatedUser).where({id:id})
                             
            }  

            res.status(201).send("usuarios editado com sucesso")
        }
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }


})

//ProductById 

app.put("/products/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id
        const newName: string | undefined = req.body.name
        const newPrice: number | undefined = req.body.price
        const newCategory: CATEGORY | undefined = req.body.category

        //validar id
        if (id !== undefined) {
            if (typeof id === "string") {

                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do produto deve possuir pelo menos 4 caracteres, o primeiro sendo a letra P maiuscula")
                }
                if (id[0] !== "P") {
                    res.status(400)
                    throw new Error("o primeiro caractere do id deve ser a letra P maiuscula ")
                }

            }

        } else {
            res.status(400)
            throw new Error("o id deve ser um valor valido")
        }


        //validar newName
        if (newName) {
            if (typeof newName !== "string") {
                res.status(400)
                throw new Error("O nome deve estar no formato string")
            }
        }

        //validar price
        if (newPrice) {
            if (typeof newPrice !== "number") {
                res.status(400)
                throw new Error("o preco deve estar no formato number")
            }
        }

        //validação catefory
        if (newCategory) {
            if (newCategory !== CATEGORY.ACCESSORIES && newCategory !== CATEGORY.CLOTHES_AND_SHOES && newCategory !== CATEGORY.ELECTRONICS) {
                res.status(400)
                throw new Error("categoria deve ser Acessórios, Roupas e calçados ou Eletrônicos")
            }
        }

        const [searchProduct] = await db ("products").where({id:id})

        //validação existencia do produto
        if (searchProduct === undefined) {
            res.status(400)
            throw new Error("produto não encontrado")
        }
        
        if (searchProduct) {

            const updatedProduct = {
                name: newName || searchProduct.name,
                price: newPrice || searchProduct.price,
                category: newCategory || searchProduct.category
            }

            await db("products").update(updatedProduct).where({id:id})


            

        }
        console.log("produto apos edição", searchProduct)

        res.status(201).send("produto editado com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//DELETE

//UserById 

app.delete("/users/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id

        //validação id

        if (id !== undefined) {
            if (typeof id === "string") {

                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do usuario deve ter pelo menos 4 caracteres, começando pela letra u minicusula")
                }
                if (id[0] !== "u") {
                    res.status(400)
                    throw new Error("o primeiro caracetere da id deve ser aletra u minuscula")
                }
            } else {
                res.status(400)
                throw new Error("o id deve ser uma string")
            }

            const findUser = await db("users").where({id:id})

            //validação existencia usuario

            if (!findUser) {
                res.status(400)
                throw new Error("usuario não encontrado")
            }

            await db ("users").delete().where({id:id})

            
            res.status(200).send("usuario deleteado com sucesso")
        }
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//ProductById 

app.delete("/products/:id", async (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        //validação id do prdouto

        if (id !== undefined) {
            if (typeof id === "string") {

                if (id.length < 4) {
                    res.status(400)
                    throw new Error("o id do produto deve possuir pelo menos 4 caracteres, o primeiro sendo a letra P maiuscula")
                }
                if (id[0] !== "P") {
                    res.status(400)
                    throw new Error("o primeiro caractere do id deve ser a letra P maiuscula ")
                }

            }

        } else {
            res.status(400)
            throw new Error("o id deve ser um valor valido")
        }

        const findProduct = await db("products").where({id:id})

        //validação existencia do produto
        if (!findProduct ) {
            res.status(400)
            throw new Error("produto não encontrado")
        }

        await db ("products").delete().where({id:id})

       

        res.status(200).send("produto deletado com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})
