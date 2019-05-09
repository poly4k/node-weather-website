const request = require('request')

const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/2c5ac434c22632121c9763f8d4d93e86/'+longtitude+','+latitude

request({ url, json: true }, (error, { body }) => {
    if(error){
       callback('Unable to connect to weather services '+error,undefined)
    }else if(body.error){
        callback('Unable to find location', undefined)
    }else{ 
        callback(undefined,body.daily.data[0].summary+
            'precip probability: '+
        body.currently.precipProbability+
        'temperature: '+ body.currently.temperature + 
        " .temperature high is "+body.daily.data[0].temperatureHigh
        + " and temperature low is "+body.daily.data[0].temperatureLow,'.')
    }
})
}
 
module.exports = forecast