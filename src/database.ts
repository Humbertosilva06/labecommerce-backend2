import { TProduct, TUser, TPurchase, CATEGORY } from "./types"

//arrays de usuarios, produtos e compras
export const users: TUser[] = [
    {
        id: "joselito",
        email: "joselito@gmail.com",
        password: "12345"
    },
    {
        id: "hermes",
        email: "hermes@gmail.com",
        password: "54321"
    },


]

export const products: TProduct[] = [
    {

        id: "P001",
        name: "Iphone",
        price: 1000,
        category: CATEGORY.ELECTRONICS

    },
    {

        id: "P002",
        name: "Calça Jeans",
        price: 150,
        category: CATEGORY.CLOTHES_AND_SHOES

    }
]

export const purchase: TPurchase[] = [
    {
        userId: "joselito",
        productId: "P001",
        quantity: 1,
        totalPrice: 1000
    },
    {
        userId: "hermes",
        productId: "P002",
        quantity: 2,
        totalPrice: 300
    }
]

//funções:
//1- criar novo usuario

export const createUser = (id: string, email: string, password: string,) => {

    users.push(
        {
            id: id,
            email: email,
            password: password
        }
    )

    console.log("Cadastro Realizado com Sucesso")

}

//2 - buscar lista de usuarios:

export const getAllUsers = (): void => {
    console.log("todos os usuarios", users)
}

//3 criar novo produto:

export const createProduct = (id: string, name: string, price: number, category: CATEGORY) => {

    products.push(
        {
            id: id,
            name: name,
            price: price,
            category: category

        }
    )

    console.log("Produto adicionado com sucesso");

}

//4 - busca todos os produtos:

export const getAllProducts = (): void => {
    console.log("todos os produtos", products)
}

//5 - busca de produto por id:

export const getProductById = (idToSearch: string): TProduct | undefined => {

   return products.find((product)=>{
        if(product.id === idToSearch){
            return product
        }
    })

}
//6 Busca de produtos por nome:

export const queryProductsByName = (q: string): Array<TProduct> => {

    return products.filter((product) => {

        return product.name.toLowerCase().includes(q.toLowerCase())

    })
}

//7 cria uma nova compra:

export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice: number) => {
    
    purchase.push(
        {

            userId: userId,
            productId: productId,
            quantity: quantity,
            totalPrice: totalPrice

        }
    )

    console.log("compra realizada com sucesso")

}


//8 - buscar todas asc ompras feitas baseadas no id do usuario:

export const getAllPurchasesFromUserId = (userIdToSearch:string) =>{

    return purchase.filter(purchase=>purchase.userId === userIdToSearch)

}
