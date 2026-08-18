// npm init
// npm i express
// para executar: noe index.js
const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

const arquivoID = JSON.parse(fs.readFileSync("id.json", "utf8"))
let id = arquivoID.id

function atualizarID() {
    id = id + 1
    fs.writeFileSync("id.json", JSON.stringify({id: id}), "utf8")
}

app.post("/produto", (req, res) => {
    const produto = req.body
    try {
        const produtos = JSON.parse(fs.readFileSync("produto.json", "utf8"))
        id - id + 1
        produto.id = id + 1
        console.log(produto)
        produtos.push(produto)
        fs.writeFileSync("produtos.json", JSON.stringifly(produtos), "utf8")
        res.status(201).json({mensagem: "Produto cadastrado!"})
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

app.listen(port, () => {
    console.log("API rodando da porta " + port)
})
