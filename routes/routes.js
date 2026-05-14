const express = require('express');
const router = express.Router();

const connection = require('../database/connection');

router.get('/ping', (req, res) => {
    return res.json({mensagem: "pong! rotas separadas funcionando."});
});

router.get('/alunos', async (req, res) => {
    try {

        const alunos = await connection('alunos').select ('*')

        res.json(alunos);
    
    } catch (error) {
        res.status(500).json({error: 'erro ao bsucar alunos' });
    }
});


router.post('/alunos', async (req,res) => {
    const {nome, idade, numero_chamada } = req.body;

    try{

        const [id] = await connection('alunos')
        .insert({ nome, idade, numero_chamada });

        if (!id) {
            return res.status(400).json([error: 'erro ao cadastrar aluno'])
        }
        res.status(201)
        .json({mesaagem: 'aluno cadastrado com sucesso'
                id,
                nome,
                idade,
                numero_chamada
    });
    
    }catch (error){
        return res.status(500).json({ erro: 'erro interno no servidor' });
    }
});
module.exports = router;