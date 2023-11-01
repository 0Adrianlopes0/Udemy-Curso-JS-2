const { async } = require('regenerator-runtime');
const Login = require('../model/LoginModel');

exports.index = (req, res) => {
    res.render('login');
}

exports.register = async function(req, res) {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.lengh > 0) {
        req.flash('errors', login.errors);
        req.session.save(function() {
            return res.redirect('back');
        });
        return;
    }

    res.send(login.user);
}