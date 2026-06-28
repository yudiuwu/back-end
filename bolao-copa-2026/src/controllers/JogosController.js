const JogosService = require("../services/JogosService");

class JogosController {

    async listar(req, res) {

        try {

            const jogos = await JogosService.listarJogos();

            return res.json(jogos);

        } catch (error) {

            return res.status(500).json({
                error: "Erro ao buscar jogos"
            });

        }
    }
}

module.exports = new JogosController();