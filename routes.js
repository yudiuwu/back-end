const express = require('express');
const router = express.Router();

const connection = require('../database/connection');
const { Database } = require('sqlite3');

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
            return res.status(400).json({error: 'erro ao cadastrar aluno'})
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

router.put('/alunos/:id', async (req, res) => {

try {

const { id } = req.params;
const { nome, idade } = req.body;

const linhasAfetadas = await db('alunos')
.where({ id })
.update({ nome, idade });

if (linhasAfetadas === 0)

return res.status(404).json({ erro: 'Aluno não existe' });
return res.status(200).json({ mensagem: 'Registro atualizado com sucesso' });

} catch (error) {

    return res.status(500).json({ erro: 'Falha ao atualizar dados' });
}
});


router.delete('/alunos/:id', async (req, res) => {

try {

const { id } = req.params;
const alunoDeletado= await Database('alunos')
.where({id})
.del();
if (alunoDeletado === 0)

    return res.status(404).json({ erro: 'Nenhum registro encontrado para deletar' });
return res.status(204).send();

} catch (error) {

    return res.status(500).json({ erro: 'Erro ao deletar' });
}
});




module.exports = router;