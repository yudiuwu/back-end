const axios = require("axios");
const connection = require("../database/connection");

class PalpitesService {

    async criar(data, userId) {

        const { jogo, gols_a, gols_b, data_jogo } = data;

        if (gols_a < 0 || gols_b < 0) {
            throw new Error("Gols não podem ser negativos");
        }

        // 🔥 APIs externas em paralelo
        const [dolarRes, feriadosRes] = await Promise.all([

            axios.get("https://economia.awesomeapi.com.br/json/last/USD-BRL"),

            axios.get("https://brasilapi.com.br/api/feriados/v1/2026")

        ]);

        const dolar = dolarRes.data.USDBRL.bid;

        const feriados = feriadosRes.data;

        // verificar se data é feriado
        const ehFeriado = feriados.some(f => f.date === data_jogo);

        const [id] = await connection("palpites").insert({
            usuario_id: userId,
            jogo,
            gols_a,
            gols_b,
            data_jogo,
            dolar_no_dia: dolar,
            dia_de_feriado: ehFeriado
        });

        return connection("palpites")
            .where({ id })
            .first();
    }
}

module.exports = new PalpitesService();