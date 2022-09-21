const express=require( 'express');
const morgan =require('morgan');
const cors =require('cors');
const axios  =require('axios');
const dotenv  =require('dotenv');

dotenv.config();

const app = express()

// settings
app.set('port', process.env.PORT)

// middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

// Life Span:
//  Adaptability:
//  Affection level:
//  Child friendly:
//  Grooming:
//  Intelligence:
//  Health issues:
//  Social needs:
//  Stranger friendly:
// --------------------------------------------------------------
// Rutas

app.get('/breeds', async (req, res) => {
    try {
        const {
            data
        } = await axios.get('https://api.thecatapi.com/v1/breeds')

        const gatos = data.map(e => {
            return {
                id: e.id,
                name: e.name,
                temperament: e.temperament,
                origin: e.origin,
                description: e.description,
                lifeSpan: e.life_span,
                adaptability: e.adaptability,
                affectionLevel: e.affection_level,
                childFriendly: e.child_friendly,
                grooming: e.grooming,
                healthIssues: e.health_issues,
                intelligence: e.intelligence,
                socialNeeds: e.social_needs,
                strangerFriendly: e.stranger_friendly,
                img: e.image?.url,
                number:data.indexOf(e)

            }
        })
        res.json(gatos)
    } catch (error) {
        console.log(error)
    }
})

app.get('/breeds/:name', async (req, res) => {

    const {
        name
    } = req.params

    try {
        const {
            data
        } = await axios.get(`https://api.thecatapi.com/v1/breeds`)

        let gato = data.filter(e => e.name === name)

        gato = gato.map(el => {
            return {
                id: el.id,
                name: el.name,
                temperament: el.temperament,
                origin: el.origin,
                description: el.description,
                lifeSpan: el.life_span,
                adaptability: el.adaptability,
                affectionLevel: el.affection_level,
                childFriendly: el.child_friendly,
                grooming: el.grooming,
                healthIssues: el.health_issues,
                intelligence: el.intelligence,
                socialNeeds: el.social_needs,
                strangerFriendly: el.stranger_friendly,
                img: el.image?.url,
                number:data.indexOf(el)
            }
        })
        res.json(gato)

    } catch (error) {
        console.log(error)
    }
})

app.get('/breedsImg/:id', async (req, res) => {

    const {
        id
    } = req.params

    try {
        const {
            data
        } = await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=8`)

        const img = data.map(element => {
            return element.url
        })
        res.json(img)
    } catch (error) {
        console.log(error)
    }
})
// ------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log('listening on port ', app.get('port'))
})