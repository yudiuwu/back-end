const { Router } = require("express");

const JogosController = require("../controllers/JogosController");

const routes = Router();

routes.get("/", (req, res) => JogosController.listar(req, res));

module.exports = routes;