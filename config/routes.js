//const user = require('../api/user')

module.exports = app => {
app.post('/signup', app.api.user.save)
app.post('/signin', app.api.auth.signin)
app.post('/validateToken', app.api.validateToken)

app.route('/users').post(app.api.user.save).get(app.api.user.get)
app.route('./users/:id').put(app.api.user.save).get(app.api.user.getById)
    //VOLTO EM 10 MINUTOS ME CHAMARAM AQUI PRA UMA REUNIÃO RAPIDA
}