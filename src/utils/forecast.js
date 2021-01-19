const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a243610b0865d603985b9e40826f5916&query=' + latitude + ',' + longitude +'&units=f'

        request({ url, json: true }, (error, { body }) => {
            if (error) {
                callback('Unable to connect to weather service!')
            } else if (body.error) {
                callback('Unable to find location. Try another search')
            } else {
                callback(undefined, `It is ${body.current.weather_descriptions[0].toLowerCase()} and currently ${body.current.temperature} degrees outside. It feels like ${body.current.feelslike} degrees.`)
            }
        })
    }

module.exports = forecast