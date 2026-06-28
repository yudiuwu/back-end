const jwt = require("jsonwebtoken");
const connection = require("../database/connection");

class AuthService {

    async login(email, senha) {

        const user = await connection("usuarios")
            .where({ email, senha })
            .first();

        if (!user) {
            throw new Error("Email ou senha inválidos");
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return {
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email
            }
        };
    }
}

module.exports = new AuthService();