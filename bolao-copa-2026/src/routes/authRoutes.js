const { Router } = require("express");
const AuthController = require("../controllers/AuthController");

const routes = Router();

routes.post("/login", (req, res) => AuthController.login(req, res));

module.exports = routes;