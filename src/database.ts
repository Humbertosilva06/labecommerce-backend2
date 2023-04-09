import { TProduct,TUser,TPurchase } from "./types"

export const users: TUser[] = [
    {
        id:"joselito",
        email:"joselito@gmail.com",
        password:"12345"
    },
    {
        id:"hermes",
        email:"hermes@gmail.com",
        password:"54321"
    },
    
    
]

export const products: TProduct[]=[
    {

    id:"p0001",
    name:"Comida",
    price:10,
    category:"alimentos"

    },
    {

    id:"p0002",
    name:"Calça Jeans",
    price:150,
    category:"Vestuario"

    }
]

export const purchase: TPurchase[]=[
    {
    userid:"joselito",
    productid:"p0001",
    quantity:1,
    totalPrice: 10
    },
    {
    userid:"hermes",
    productid:"p002",
    quantity:2,
    totalPrice:300
    }
]
