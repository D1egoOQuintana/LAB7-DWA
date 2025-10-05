import express from 'express';
import WebController from '../controllers/WebController.js';

const router = express.Router();

// Rutas públicas
router.get('/', (req, res) => res.redirect('/signin'));
router.get('/signin', WebController.renderSignIn);
router.get('/signup', WebController.renderSignUp);

// Rutas protegidas (se validará con JavaScript en el cliente)
router.get('/dashboard-user', WebController.renderUserDashboard);
router.get('/dashboard-admin', WebController.renderAdminDashboard);
router.get('/profile', WebController.renderProfile);

// Páginas de error
router.get('/403', WebController.render403);

export default router;