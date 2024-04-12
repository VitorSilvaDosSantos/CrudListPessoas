const express = require('express')
const router = express.Router()

// Lista de pessoas
let listaPessoas = [
    {
        id: 1,
        nome: "João",
        idade: 30,
        email: "joao@gmail.com",
        telefone: "61900010001"
    },
    {
        id: 2,
        nome: "Maria",
        idade: 25,
        email: "maria@gmail.com",
        telefone: "61900010002"
    },
    {
        id: 3,
        nome: "Pedro",
        idade: 40,
        email: "pedro@gmail.com",
        telefone: "61900010003"
    }
]

// READ -> Buscar todas as pessoas
router.get('/pessoas', (req, res) => {
    res.json(listaPessoas)
})

// READ -> Buscar a pessoa pelo ID
router.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pessoa = listaPessoas.find(pessoa => pessoa.id === id)
    if (!pessoa) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else {
        res.json(pessoa)
    }
})

// CREATE -> Criar uma nova pessoa
router.post('/pessoas', (req, res) => {
    const novaPessoa = req.body

    const pessoa = {
        id: listaPessoas.length > 0 ? listaPessoas[listaPessoas.length - 1].id + 1 : 1,
        nome: novaPessoa.nome,
        idade: novaPessoa.idade,
        email: novaPessoa.email,
        telefone: novaPessoa.telefone
    }

    listaPessoas.push(pessoa)

    res.status(201).json({ mensagem: "Pessoa cadastrada com sucesso!" })
})

// DELETE -> Deletar uma pessoa
router.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = listaPessoas.findIndex(pessoa => pessoa.id === id)
    if (index === -1) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else {
        listaPessoas.splice(index, 1)
        res.json({ mensagem: "Pessoa excluída com sucesso" })
    }
})

// UPDATE -> Atualizar uma pessoa
router.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const novosDados = req.body

    const index = listaPessoas.findIndex(pessoa => pessoa.id === id)

    if (index === -1) {
        res.status(404).json({ mensagem: "Pessoa não encontrada" })
    } else {
        listaPessoas[index] = {
            id: id,
            nome: novosDados.nome,
            idade: novosDados.idade,
            email: novosDados.email,
            telefone: novosDados.telefone
        }
        res.json({ mensagem: "Pessoa atualizada com sucesso!" })
    }
})

module.exports = router
