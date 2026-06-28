const PalpitesService = require("../services/PalpitesService");
const connection = require("../database/connection");

class PalpitesController {

    async criar(req, res) {

        try {

            const userId = req.user.id;

            const result = await PalpitesService.criar(req.body, userId);

            return res.status(201).json(result);

        } catch (error) {

            return res.status(400).json({
                error: error.message
            });

        }
    }

    async listar(req, res) {

        const userId = req.user.id;

        const palpites = await connection("palpites")
            .where({ usuario_id: userId });

        return res.json(palpites);
    }

    async atualizar(req, res) {

        const userId = req.user.id;
        const { id } = req.params;
        const { gols_a, gols_b } = req.body;

        const palpite = await connection("palpites")
            .where({ id, usuario_id: userId })
            .first();

        if (!palpite) {
            return res.status(403).json({
                error: "Sem permissão"
            });
        }

        await connection("palpites")
            .where({ id })
            .update({ gols_a, gols_b });

        return res.json({ message: "Atualizado com sucesso" });
    }

    async deletar(req, res) {

        const userId = req.user.id;
        const { id } = req.params;

        const palpite = await connection("palpites")
            .where({ id, usuario_id: userId })
            .first();

        if (!palpite) {
            return res.status(403).json({
                error: "Sem permissão"
            });
        }

        await connection("palpites")
            .where({ id })
            .del();

        return res.json({ message: "Deletado com sucesso" });
    }
}

module.exports = new PalpitesController();