const { Router } = require('express');

const authRoutes = require('./authRoutes');
const jogosRoutes = require('./jogosRoutes');
const palpitesRoutes = require('./palpitesRoutes');

const routes = Router();

routes.use('/api', authRoutes);

routes.use('/api', jogosRoutes);

routes.use('/api', palpitesRoutes);

module.exports = routes;