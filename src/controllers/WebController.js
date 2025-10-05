class WebController {

    renderSignIn(req, res) {
        res.render('signin', { title: 'Iniciar Sesión' });
    }

    renderSignUp(req, res) {
        res.render('signup', { title: 'Registrarse' });
    }

    renderUserDashboard(req, res) {
        res.render('dashboard-user', { title: 'Dashboard Usuario' });
    }

    renderAdminDashboard(req, res) {
        res.render('dashboard-admin', { title: 'Dashboard Administrador' });
    }

    renderProfile(req, res) {
        res.render('profile', { title: 'Mi Perfil' });
    }

    render403(req, res) {
        res.status(403).render('403', { title: 'Acceso Denegado' });
    }

    render404(req, res) {
        res.status(404).render('404', { title: 'Página No Encontrada' });
    }
}

export default new WebController();