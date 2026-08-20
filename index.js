// npm init
// npm i express
// para executar: node index.js
// para teste: ​http://localhost:3000/aula
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

app.post("/aula", (req, res) => {
    const aula = req.body
    try {
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        atualizarID()
        aula.id = id
        aulas.push(aula)
        fs.writeFileSync("aulas.json", JSON.stringify(aulas), "utf8")
        res.status(201).json({mensagem: "Aula cadastrado!"})
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})




app.listen(port, () => {
    console.log("API rodando da porta " + port)
})