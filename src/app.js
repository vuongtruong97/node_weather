const express = require('express')
const handlebars = require('express-handlebars')
const path = require('path')
const forecast = require('./utils/forecast')
const geocoding = require('./utils/geocoding')

const app = express()

//defined paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/layouts/main')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//setup static directory
app.use(express.static(publicDirectoryPath))

//setup express-handlebars engine and views location
app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
        partialsDir: partialsPath,
        defaultLayout: viewsPath,
    })
)
app.set('view engine', 'hbs')
app.set('views', path.resolve(__dirname, '../templates'))

// define router
app.get('/', (req, res) => {
    res.render('home', { title: 'Home Page', name: 'Vuong Truong' })
})
app.get('/help', (req, res) => {
    res.render('help')
})
app.get('/about', (req, res) => {
    res.render('about', { name: 'Vuong' })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        const { address } = req.query
        return res.send({ error: 'You must provide an address' })
    } else {
        const { address } = req.query
        geocoding(address).then(({ longitude, latitude, error } = {}) => {
            if (error) {
                return res.json({ error })
            }
            forecast(longitude, latitude).then((data) => {
                return res.json({
                    temp: data.main.temp,
                    pressure: data.main.pressure,
                    location: data.name,
                    country: data.sys.country,
                    visibility: data.visibility,
                    windspeed: data.wind.speed,
                    humidity: data.main.humidity,
                    weather: data.weather[0],
                })
            })
        })
    }
})
app.get('/help/*', (req, res) => {
    res.status(400).render('404', {
        title: 'Not found',
        message: 'Help article not found',
    })
})
app.get('/about/*', (req, res) => {
    res.status(400).render('404', {
        title: 'Not found',
        message: 'About article not found',
    })
})
app.get('*', (req, res) => {
    res.status(400).render('404', {
        title: 'Not found',
        message: 'Page not found',
    })
})
app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`)
})
