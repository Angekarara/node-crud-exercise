const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
dotenv.config()

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("connected to database"))

const itemsSchema = new mongoose.Schema({
    name: String,
    age: Number,
})

const Item = mongoose.model("Item", itemsSchema)
app.use(express.json())

app.post("/items", async (req, res) => {
    try {
        const items = await new Item(req.body).save()
        res.status(200).send(items)
    } catch (error) {
    }
})

app.get("/items", async (req, res) => {
    try {
        const items = await Item.find()
        res.status(200).send(items)
    } catch (error) {
        res.status(400).json({error: "not found"})
    }
})

app.get("/items/:id", async (req, res) => {
    try {
        const id = req.params.id
        const item = await Item.findById(id)
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send("bad request")
    }
})

app.put("/items/:id", async (req, res) => {
    try {
        const id = req.params.id
        const item = await Item.findByIdAndDelete(id, req.body)
        res.status(200).send(item)
    } catch (error) {
        res.status(500).send("internal server error")
    }
})

app.delete("/items/:id", async (req, res) => {
    try {
        const id = req.params.id
        const item = await Item.findByIdAndDelete(id)
        res.status(200).send(item)
    } catch (error) {
        res.status(400).send("bad request")
    }
})


app.listen(5000)