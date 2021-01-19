const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')


const app = express()

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Sets up handlebars engine and views loc
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup statis directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Alec Zebrick'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        info: 'This is a weather app designed by Alec Zebrick using API data from weatherstacks and GeoCode',
        picture: "/img/headshot2.png",
        name: 'Alec Zebrick'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Helpful information right here',
        title:'Help',
        name: 'Alec Zebrick'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alec Zebrick',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Alec Zebrick',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000);