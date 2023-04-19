import { users, products, purchase, createUser, getAllUsers, createProduct, getAllProducts, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";

import express, { Request, Response, response } from "express"
import cors from "cors"
import { TUser, TProduct, CATEGORY } from "./types";
import { TPurchase } from "./types";
import { db } from "./database/knex";
import { error } from "console";
import { type } from "os";

//inciar servidor na porta 3003


// console.log(users, products, purchase)

// createUser("u003", "Renato", "renato@email.com", "456789")
// getAllUsers()
// createProduct("P003", "Brinco Feminino", 12.50, CATEGORY.ACCESSORIES)
// getAllProducts()
// console.log("produto por id", getProductById("P003"))
// console.table(queryProductsByName("iphone"))
// createPurchase("Renato", "P003", 3, 37.50)
// console.log(getAllPurchasesFromUserId("Renato"))

//inciar servidor na porta 3003
const app = express()
app.use(express.json())
app.use(cors())
app.listen(3003, () => {
    console.log("servidor rodando na porta 3003")
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("pong")

})


//endpoints

/*// POST

//createUser (cria um usuario na lista users) NORMAL E KNEX ABAIXO

// app.post("/users", (req: Request, res: Response) => {
//     try {
//         const id: string | undefined = req.body.id
//         const name: string | undefined = req.body.name
//         const email: string | undefined = req.body.email
//         const password: string | undefined = req.body.password
//         //validação de id
//         if (id !== undefined) {
//             if (typeof id === "string") {
//                 const verifyNewId: TUser | undefined = users.find((user) => user.id === id)
//                 if (verifyNewId) {
//                     res.status(400)
//                     throw new Error("ja existe um usuario com o mesmo id, envie outro valor")
//                 }
//                 if (id.length < 4) {
//                     res.status(400)
//                     throw new Error("o id do usuario deve ter pelo menos 4 caracteres, começando pela letra u minicusula")
//                 }
//                 if (id[0] !== "u") {
//                     res.status(400)
//                     throw new Error("o primeiro caracetere da id devee ser a letra u minuscula")
//                 }
//             } else {
//                 res.status(400)
//                 throw new Error("o id deve ser uma string")
//             }

//         } else {
//             res.status(400)
//             throw new Error("o id deve ser um valor valido")
//         }

//         //validação name
//         if (name !== undefined) {
//             if (typeof name !== "string") {
//                 res.status(400)
//                 throw new Error("o nome deve estar em string")

//             }

//         } else {
//             res.status(400)
//             throw new Error("o name deve ser um valor valido")
//         }

//         //validação do email
//         if (email !== undefined) {
//             if (typeof email === "string") {
//                 const verifyNewEmail: TUser | undefined = users.find((user) => user.email === email)
//                 if (verifyNewEmail) {
//                     res.status(400)
//                     throw new Error("ja existe um usuario com o mesmo email, envie um email diferente")
//                 }
//             } else {
//                 res.status(400)
//                 throw new Error("o email deve ser uma string")
//             }

//         } else {
//             res.status(400)
//             throw new Error("o email deve ser um valor valido")
//         }

//         //validação password
//         if (password !== undefined) {
//             if (typeof password !== "string") {
//                 res.status(400)
//                 throw new Error("O password deve ser uma string")

//             }

//         } else {
//             res.status(400)
//             throw new Error("o password deve ser um valor valido")
//         }


//         const newUser: TUser = { id, name, email, password }

//         users.push(newUser)
//         console.log("usuarios", users)
//         res.status(201).send("usuario incluido com sucesso")
//     } catch (err) {

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         console.log(err)
//         res.send(err.message)

//     }
// })*/

app.post("/users", async (req: Request, res: Response) => {
    try {
        const id: string | undefined = req.body.id
        const name: string | undefined = req.body.name
        const email: string | undefined = req.body.email
        const password: string | undefined = req.body.password
        //validação de id
        if (id !== undefined) {
            if (typeof id === "string") {
                const [verifyIfIdExists] = await db.raw(`
                    SELECT * FROM users
                    WHERE id = "${id}";                    
                `)

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
                const [verifyIfEmailExist] = await db.raw(`
                SELECT * FROM users
                WHERE email = "${email}"; 
                `)
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

        await db.raw(`
        INSERT INTO users (id, name, email, password)
        VALUES
        ("${id}", "${name}", "${email}", "${password}");
        
        `)
        
        res.status(201).send("usuario incluido com sucesso")
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//createProduct (cria um novo produto na lista deprodutos) NORMAL E ABAIXO KNEX

/*// app.post("/products", (req: Request, res: Response) => {

//     try {
//         const id: string | undefined = req.body.id
//         const name: string | undefined = req.body.name
//         const price: number | undefined = req.body.price
//         const category: CATEGORY | undefined = req.body.category

//         //validação id do produto (se o id não é undefined, se é string, se possui 4 caracteres no minimo e se o primeiro caraceter é a letra P maisucula)
//         if (id !== undefined) {
//             if (typeof id === "string") {
//                 const searchProductId: TProduct = products.find((product) => product.id === id)
//                 if (searchProductId) {
//                     res.status(400)
//                     throw new Error("ja existe um produto com o mesmo id, cadastre um valor diferente")
//                 }
//                 if (id.length < 4) {
//                     res.status(400)
//                     throw new Error("o id do produto deve possuir pelo menos 4 caracteres, o primeiro sendo a letra P maiuscula")
//                 }
//                 if (id[0] !== "P") {
//                     res.status(400)
//                     throw new Error("o primeiro caractere do id deve ser a letra P maiuscula ")
//                 }

//             }

//         } else {
//             res.status(400)
//             throw new Error("o id deve ser um valor valido")
//         }

//         //validação name

//         if (name !== undefined) {
//             if (typeof name !== "string") {
//                 res.status(400)
//                 throw new Error("o nome do produto deve ser em string")
//             }

//         } else {
//             res.status(400)
//             throw new Error("nome invalido, insira um valor")
//         }

//         //validação price

//         if (price !== undefined) {
//             if (typeof price !== "number") {
//                 res.status(400)
//                 throw new Error("valor invalido, o preco deve ser um numero")
//             }

//         } else {
//             res.status(400)
//             throw new Error("preço invalido, insira um valor valido")
//         }

//         //validação category

//         if (category !== undefined) {
//             if (category !== CATEGORY.ACCESSORIES && category !== CATEGORY.CLOTHES_AND_SHOES && category !== CATEGORY.ELECTRONICS) {
//                 res.status(400)
//                 throw new Error("categoria invalida, escolha entre Acessórios, Roupas e calçados ou Eletrônicos")

//             }

//         } else {
//             res.status(400)
//             throw new Error("Categoria invalida, insiria uma categoria valida")

//         }

//         const newProduct: TProduct = { id, name, price, category }

//         products.push(newProduct)
//         console.log("endpoint lista dosprodutos", products)

//         res.status(201).send("produto incluido com sucesso")
//     } catch (err) {
//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         console.log(err)
//         res.send(err.message)
//     }

// })*/
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
                const [searchProductId] = await db.raw(`
                    SELECT * FROM products
                    WHERE id = "${id}"                
                `)
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

       await db.raw(`
            INSERT INTO products (id, name, price, category, description, "imageUrl")
            VALUES
            ("${id}", "${name}", "${price}", "${category}", "${description}", "${imageUrl}");
       
       `)
        console.log("endpoint lista dosprodutos", products)

        res.status(201).send("produto incluido com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//cretePuchase (cria uma nova compra) NORMAL E ABAIXO KNEX

/*app.post("/purchases", (req: Request, res: Response) => {
    try {
        const userId: string = req.body.userId
        const productId: string = req.body.productId
        const quantity: number = req.body.quantity
        const totalPrice: number = req.body.totalPrice

        //validação id do usuario
        if (userId !== undefined) {
            if (typeof userId === "string") {
                const searchUserIdInUsers: TUser | undefined = users.find((user) => user.id === userId)
                if (!searchUserIdInUsers) {
                    res.status(400)
                    throw new Error("id do usuario não cadastrado. Informe um id cadastrado ou cadastre-se")

                }

            } else {
                res.status(400)
                throw new Error("valor invalido, insira um id no formato de string")
            }

        } else {
            res.status(400)
            throw new Error("compra invalida, insira um valor valido")
        }

        //validação id do produto
        if (productId !== undefined) {
            if (typeof productId === "string") {
                const searchProductId: TProduct | undefined = products.find((product) => product.id === productId)
                if (!searchProductId) {
                    res.status(400)
                    throw new Error("id do produto não existe, insira um id existente")
                }

            } else {
                res.status(400)
                throw new Error("id do produto em formato invalido, deve ser uma string")
            }

        } else {
            res.status(400)
            throw new Error("id invalido, insira um id valido")
        }

        //validação quantity
        if (quantity !== undefined) {
            if (typeof quantity !== "number") {
                res.status(400)
                throw new Error("tipo de valor invalido, insira o valor no formato number")
            }

        } else {
            res.status(400)
            throw new Error("valor de quantidade invalido, insira um valor valido")
        }

        //validação total price
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
                res.status(400)
                throw new Error("total price formato invalido, o formato deve ser number")
            } else if (typeof totalPrice === "number") {
                const searchProductOfPurchase: TProduct = products.find((product) => product.id === productId)
                if (searchProductOfPurchase.price * quantity !== totalPrice) {
                    res.status(400)
                    throw new Error("total da compra invalido, o total deve ser a quantidade X o valor unitario")
                }

            }


        } else {
            res.status(400)
            throw new Error("valor de totalprice invalido, insira um valor valido")
        }

        const newPurchase: TPurchase = { userId, productId, quantity, totalPrice }


        purchase.push(newPurchase)
        console.log("endpoint lista de compras", purchase)

        res.status(201).send("nova compra incluida com sucesso")
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})*/
app.post("/purchases", async (req: Request, res: Response) => {
    try {
        const id: string = req.body.id
        const buyer: string = req.body.buyer
        const totalPrice: number = req.body.totalPrice
        const paid: number = req.body.paid       
        

        //validação id da compra
        if (id !== undefined) {
            if (typeof id === "string") {
                const [searchIfPurchaseIdExist] = await db.raw(`
                        SELECT * FROM purchases
                        WHERE id = "${id}";
                `)
                if (searchIfPurchaseIdExist) {
                    res.status(400)
                    throw new Error("compra ja existe, cadatres outro id")

                }

                if(id.length < 7){
                    res.status(400)
                    throw new Error("O id deve ter no minimo 7 caracteres e começar com a sigla 'pur'")
                }

                // if(id[0] !== "p" && id[1] !== "u" && id[2]!== "r"){
                //     res.status(400)
                //     throw new Error("Os tres primeiros caracteres do id devem ser s sigla 'pur' em letras minucusculas ")
                // }

            } else {
                res.status(400)
                throw new Error("valor invalido, insira um id no formato de string começando com a sigla 'pur' minuscula seguida de 4 numeors ")
            }

        } else {
            res.status(400)
            throw new Error("compra invalida, insira um valor valido")
        }

        //validação do buyer
        if (buyer !== undefined) {
            if (typeof buyer=== "string") {
                const [searchIfBuyerIsRegistered] = await db.raw(`
                    SELECT * FROM users
                    WHERE id = "${buyer}";

                `)
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
        if (totalPrice !== undefined) {
            if (typeof totalPrice !== "number") {
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
        

       await db.raw (`
            INSERT INTO purchases (id, buyer, total_price, paid )
            VALUES
            ("${id}", "${buyer}", ${totalPrice}, ${paid})
       `)


        
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
/*getAllUsers (lista todos os usuarios da lista) NORMAL E COM KNEX ABAIXO

// app.get("/users", (req: Request, res: Response) => {
//     try {
//         res.status(200).send(users)
//     } catch (err) {

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         console.log(err)
//         res.send(err.message)

//     }
// })*/

app.get("/users", async (req: Request, res: Response) => {
        try {

            const result = await db.raw(`
                SELECT * FROM users;            
            `)
            res.status(200).send(result)
        } catch (err) {
    
            if (res.statusCode === 200) {
                res.status(500)
            }
    
            console.log(err)
            res.send(err.message)
    
        }
    })

// getAllProducts (lista todos os produtos) NORMAL E COM KNEX ABAIXO

// app.get("/products", (req: Request, res: Response) => {
//     try {
//         res.status(200).send(products)
//     } catch (err) {

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         console.log(err)
//         res.send(err.message)

//     }

// })
app.get("/products", async (req: Request, res: Response) => {
    try {

        const result  = await db.raw(`
             SELECT * FROM products;
        `)
        res.status(200).send(result)
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//searchProductbyName

// app.get("/products/search", async (req: Request, res: Response) => {

//     try {

//         const q = req.query.q as string

//         if (q.length < 1) {
//             res.status(400)
//             throw new Error("a query deve possuir mais de 1 caractere")
//         }

//         const result = q ?
//             products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()))
//             :
//             products

//         res.status(200).send(result)
//     } catch (err) {

//         if (res.statusCode === 200) {
//             res.status(500)
//         }

//         console.log(err)
//         res.send(err.message)

//     }

// })
app.get("/products/search", async (req: Request, res: Response) => {

    try {
        
        const q = req.query.q as string

        if (q.length < 1) {
            res.status(400)
            throw new Error("a query deve possuir mais de 1 caractere")
        }

        const result = await db.raw(`
            SELECT * FROM products
            WHERE name LIKE "%${q}%"
        
        `)

        res.status(200).send(result)
    } catch (err) {

        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)

    }

})

//getProductsbyID NORMAL E KNEX ABAIXO

/*app.get("/products/:id", (req: Request, res: Response) => {
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
        const result: TProduct | undefined = products.find((product) => product.id === id)
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

})*/
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
        const [result] = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}";
        `)
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
//getUserPurchasesByID NORMAL E KNEX ABAIXO

/*app.get("/users/:id/purchases", (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        //validação existencia do usuario

        if (id !== undefined) {
            if (typeof id === "string") {
                const searchUser: TUser = users.find((user) => user.id === id)
                if (!searchUser) {
                    res.status(400)
                    throw new Error("usuario não encontrado, forneça um id existente")
                }
            }

        } else {
            res.status(400)
            throw new Error("id invalida, insira um formato valido")
        }

        const result = purchase.filter((purchase) => purchase.userId.toLowerCase() === id.toLowerCase())

        res.status(200).send(result)
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})*/

app.get("/users/:id/purchases", async (req: Request, res: Response) => {

    try {
        const id: string = req.params.id

        //validação existencia do usuario

        if (id !== undefined) {
            if (typeof id === "string") {
                const searchUser = await db.raw(`
                    SELECT * FROM users
                    WHERE id = "${id}";
                `)
                if (!searchUser) {
                    res.status(400)
                    throw new Error("usuario não encontrado, forneça um id existente")
                }
            }

        } else {
            res.status(400)
            throw new Error("id invalida, insira um formato valido")
        }

            const [result] = await db.raw(`
                SELECT * FROM purchases
                WHERE buyer = "${id}";
            `)

            console.log("teste tipo", typeof result)

        res.status(200).send(result)
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//PUT

//edituserByID (edita os dados de um usuario)

app.put("/users/:id", (req: Request, res: Response) => {
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


            const searchUser: TUser | undefined = users.find((user) => user.id === id)

            //validação ususario
            if (searchUser === undefined) {
                res.status(400)
                throw new Error("usuario não encontrado")
            }

            console.log("antes da edição", searchUser)
            if (searchUser) {
                searchUser.email = newEmail || searchUser.email
                searchUser.password = newPassword || searchUser.password
                searchUser.name = newName || searchUser.name
            }
            console.log("apos edição", searchUser);



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

//editProductById (edita um produto)

app.put("/products/:id", (req: Request, res: Response) => {
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

        const searchProduct: TProduct | undefined = products.find((product) => product.id === id)

        //validação existencia do produto
        if (searchProduct === undefined) {
            res.status(400)
            throw new Error("produto não encontrado")
        }
        console.log("produto antes da edição", searchProduct)
        if (searchProduct) {
            searchProduct.name = newName || searchProduct.name
            searchProduct.price = isNaN(newPrice) ? searchProduct.price : newPrice
            searchProduct.category = newCategory || searchProduct.category

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

//delteUserById (deleta um usuario )

app.delete("/users/:id", (req: Request, res: Response) => {
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

            const findUser: number = users.findIndex((user) => user.id === id)

            //validação existencia usuario

            if (findUser === -1) {
                res.status(400)
                throw new Error("usuario não encontrado")
            }


            let message: string = "usuario deletado"
            if (findUser >= 0) {

                users.splice(findUser, 1)
            }

            res.status(200).send(message)
        }
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})

//dleteProductById (deleta um produto)

app.delete("/products/:id", (req: Request, res: Response) => {

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

        const findProduct = products.findIndex((product) => product.id === id)

        //validação existencia do produto
        if (findProduct === -1) {
            res.status(400)
            throw new Error("produto não encontrado")
        }


        let message: string = "produto deletado"
        if (findProduct >= 0) {

            products.splice(findProduct, 1)
        }

        res.status(200).send(message)
    } catch (err) {
        if (res.statusCode === 200) {
            res.status(500)
        }

        console.log(err)
        res.send(err.message)
    }

})
//teste