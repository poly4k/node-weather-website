const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialPath)

// setup handlebars engine and set views location
app.set('view engine','hbs')
app.set('views', viewsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather App',
        name: 'Nick Mid'
    })
})

app.get('/about',(req, res)=>{
    res.render('about', {
        title: 'About Me',
        name: 'Nick Mid'
    })
})

app.get('/help',(req, res)=>{
    res.render('help', {
        helpText: 'Some useful helpful text',
        title: 'Help',
        name: 'Nick Mid'
    })
})

app.get('/weather', (req, res)=>{

    const address = req.query.address;

    if(!address){
        return res.send({
             error: 'You must provide an address'
         })
     }else{
        geoCode(address, (error, {latitude, longtitude, location } = {})=>{

            if(error){
                res.send({
                    error: error
                })
            }
            
            forecast(longtitude, latitude,(error, forecastData)=>{
            if(error){
                res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address
            })
        })
        })
     }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404',
        name:'Nick Mid',
        errorMessage: 'Article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Nick Mid',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})