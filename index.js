import mysql from "mysql2/promise"
import express from 'express'
import {config} from 'dotenv'
config()


const app = express()

const pool = mysql.createPool({
    hostname: process.env.HOSTNAME,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

})

/* 2. Create a route with a path of ‘products’ :
 a. that returns all the products in the database*/
app.get('/products', async (req,res)=>{
    res.json({products: await getProducts()})
})

const getProducts = async () => {
    let [data] = await pool.query('SELECT * FROM products')
    return data
}
//console.log(await getProducts());


//b. that returns a single product based on its primary key.
app.get('/products/:product_code', async (req,res)=>{
    res.json({products: await getSingleProducts(req.params.product_code)})
})

const getSingleProducts = async (product_code) => {
    let [data] = await pool.query('SELECT * FROM products WHERE product_code = ?', [product_code])
    return data
}
//console.log(await getSingleProducts());


//c. that inserts a new product within the database.
app.post('/products', async (req, res)=>{
    res.join({products: await getProducts ()})
})

const postProducts = async (product_code,product_name, product_price, product_quantity) => {
    let [data] = await pool.query('INSERT INTO products (product_code, product_name, product_price, product_quantity) VALUES (?,?,?,?)',[product_code,product_name, product_price, product_quantity])
    return await postProducts()
}
//console.log(await postProducts('nood1', 'Noodles', 9.00, 4));

//d. that deletes a product based on its primary key.
app.delete('/products:product_code', async (req, res)=>{
    res.json({products: await deleteProducts(req.params.product_code)})
})

const deleteProducts = async (product_code)=> {
    let [data] = await pool.query('DELETE FROM products WHERE product_code = ?' ,[product_code])
    return await getProducts()
}
//console.log(await deleteProducts('pota1'));


//e. that updates a product based on its primary key.
app.patch('/products:product_code', async(req, res)=>{
    res.json({products: await patchProducts(req.params.product_code)})
})

const patchProducts = async (product_code) => {
    let [data] = await pool.query('UPDATE products SET product_price = 50.00  WHERE product_code=?' , [product_code])
    return await getProducts()
}
//console.log(await patchProducts('hand1'));


// ------------------------------------------------------------------------------------------------------------------------------------

/*3. Create a route with a path of ‘users’:
f. that returns all the users in the database */
app.get('/users', async (req,res)=>{
    res.json({users: await getUsers()})
})

const getUsers = async () => {
    let [data] = await pool.query('SELECT * FROM users')
    return data
}
//console.log(await getUsers());

//g. that returns a single user based on its primary key
app.get('/users/:id', async (req,res)=>{
    res.json({users: await getSingleUser(req.params.id)})
})
const getSingleUser = async (id) => {
    let [data] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    return data
}
//console.log(await getSingleUser('1'));

//h. that inserts a new user within the database.
app.post('/users', async (req, res)=>{
    res.join({users: await getUsers ()})
})

const postUser = async (id, email, first_name, last_name, password) => {
    let [data] = await pool.query('INSERT INTO users (id, email, first_name, last_name, password) VALUES (?,?,?,?,?)',[id, email, first_name, last_name, password])
    return await postUser()
}
//console.log(await postUser(3, 'sinovuyo@gmail.com', 'Sinovuyo', 'Mjulwa', 'sinovuyomjulwa'))


//i. that deletes a user based on its primary key.
app.delete('/users:id', async (req, res)=>{
    res.json({users: await deleteUsers(req.params.id)})
})

const deleteUsers = async (id)=> {
    let [data] = await pool.query('DELETE FROM users WHERE id = ?' ,[id])
    return await getUsers()
}
//console.log(await deleteUsers('1'));

app.listen(3000,()=>{
    console.log('http://localhost:3000');
})





