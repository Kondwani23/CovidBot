const Restify = require('restify')
const methods = require('./methods')

const app = Restify.createServer({
    name: 'CovidBot'
})

const token = 'abc12345'
const bot = new methods('EAAEeBNGryzABANpvN3lZCojmShX7YZBqtE2XvjKrlgrwFn3pZCZBNcUCAuKhSUK9ZAezDpByS6ST0QzzRrYu6gP6uN86aSIzq69mLK3rLWZAkja9SiluLlcSyCbU8ZANvJH2OVpKAKGYhj6lWf2B40cTLpARaj2vqdfQeWgEZA7xLZAMDewjsugg0')

app.use(Restify.plugins.jsonp())
app.use(Restify.plugins.bodyParser())

app.get('/', (req, res, next) => {
    console.log(req.query['hub.mode'])
    if(req.query['hub.mode'] == 'subscribe' && req.query['hub.verify_token'] == token) {
        res.end(req.query['hub.challenge'])
    } else {
        next()
    }
})

app.post('/', (req, res, next) => {
    const response = req.body
    if(response.object === "page") {
        const messageObj = bot.getMessageObject(response)
        bot.sendText(`You said: ${messageObj.message}`, messageObj.id)
        bot.sendText(`Entity: ${messageObj.entity}`, messageObj.id)
    }
    res.send(200)
})

app.listen(8080)
