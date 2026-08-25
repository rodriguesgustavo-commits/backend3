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

app.get("/segunda", (req, res) => {
    try {
        const aulas = JSON.parse(fs.readFileSync("aulas.json", "utf8"))
        const Dia_Da_Semana = aulas.filter((aula) => aula.Dia_Da_Semana == "segunda")
        const ordem_aula = Dia_Da_Semana.sort((a, b) => a.ordem_aula - b.ordem_aula)
        res.status(200).json(ordem_aula)
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

 app.get("/segunda/:Dia_Da_Semana", (req, res) => {
    const Dia_Da_Semana = req.params.Dia_De_Semana
    
 })

app.listen(port, () => {
    console.log("API rodando da porta " + port)
})
