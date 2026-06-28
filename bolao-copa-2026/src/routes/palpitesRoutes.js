const { Router } = require('express');

const PalpitesController = require('../controllers/PalpitesController');
const auth = require('../middlewares/AuthMiddleware');

const routes = Router();

routes.use(auth);

routes.get('/', PalpitesController.listar);

routes.post('/', PalpitesController.criar);

routes.put('/:id', PalpitesController.atualizar);

routes.delete('/:id', PalpitesController.deletar);

module.exports = routes;