const axios = require("axios");

class JogosService {

    async listarJogos() {

        // Exemplo de API pública de futebol (simples e gratuita)
        const response = await axios.get(
            "https://www.thesportsdb.com/api/v1/json/3/eventsnextleague.php?id=4328"
        );

        const jogos = response.data.events;

        // 🔥 tratar dados (não retornar tudo cru)
        return jogos.map(jogo => ({
            id: jogo.idEvent,
            time_casa: jogo.strHomeTeam,
            time_fora: jogo.strAwayTeam,
            data: jogo.dateEvent,
            horario: jogo.strTime
        }));
    }
}

module.exports = new JogosService();