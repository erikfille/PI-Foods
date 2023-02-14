const { Router } = require('express');
// Importar todos los routers;
const dietRouter = require('./middlewares/dietRouter');
const recipeRouter = require('./middlewares/recipeRouter');


const router = Router();

// Configurar los routers
router.use('/recipes', recipeRouter)
router.use('/diet', dietRouter)

module.exports = router;
