import mysql from "mysql2/promise"
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})

const getUsers = async ()=>{
    let [data] = await pool.query('SELECT * FROM users')
    return data
}

const getProducts = async () => {
    let [data] = await pool.query('SELECT * FROM products')
    return data
}

const deleteProducts = async (product_code)=> {
    let [data] = await pool.query('DELETE FROM products WHERE product_code = ?' ,[product_code])
    return await getProducts()
}

const postProducts = async (product_code, product_name, product_price, product_quantity) => {
    let [data] = await pool.query('INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?,?,?,?)',[product_code, product_name, product_price, product_quantity])
    return await getProducts()
}

const patchProducts = async (product_code) => {
    let [data] = await pool.query('UPDATE products SET product_price = 25.00  WHERE product_code=?' , [product_code])
    return await getProducts()
}



console.log(await getUsers());
console.log(await getProducts());
console.log(await deleteProducts());
console.log(await postProducts());
console.log(await patchProducts());


