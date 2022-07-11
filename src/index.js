const express = require('express');
const morgan= require('morgan');
const cors=require('cors');

const axios=require('axios');
const app = express()

// settings
app.set('port',3001)

// middlewares
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

app.get('/breeds',async(req,res) => {
    try {
        const {data}=await axios.get('https://api.thecatapi.com/v1/breeds')
        
        const gatos=data.map(e=>{
            return{
                id:e.id,
                name:e.name,
                temperamet:e.temperamet,
                origin:e.origin,
                description:e.description,
                lifeSpan:e.life_span,
                adaptability:e.adaptability,
                affectionLevel:e.affection_level,
                childFriendly:e.child_friendly,
                grooming:e.grooming,
                healthIssues:e.health_issues,
                intelligence:e.intelligence,
                socialNeeds:e.social_needs,
                strangerFriendly:e.stranger_friendly,
                img:e.image?.url

            }
        })
        res.json(gatos)
    } catch (error) {
        console.log(error)
    }
})

app.get('/breeds/:name',async (req,res)=>{

    const {name}=req.params
    try {
        const {data}=await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${name}`)

        const gato=data.map(e=>{
            return{
                id:e.id,
                name:e.name,
                temperamet:e.temperamet,
                origin:e.origin,
                description:e.description,
                lifeSpan:e.life_span,
                adaptability:e.adaptability,
                affectionLevel:e.affection_level,
                childFriendly:e.child_friendly,
                grooming:e.grooming,
                healthIssues:e.health_issues,
                intelligence:e.intelligence,
                socialNeeds:e.social_needs,
                strangerFriendly:e.stranger_friendly,
                img:e.image?.url

            }
        })
        res.json(gato)
        
    } catch (error) {
        console.log(error)
    }
})

app.get('/breedsImg/:id',async(req,res)=>{

    const {id}=req.params

    try {
        const {data}=await axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${id}&limit=8`)

        const img= data.map(elemet=>{
            return{
                img:elemet.url
            }
            })
        res.json(img)
    } catch (error) {
        console.log(error)
    }
})
// ------------------------------------------------------------
app.listen(app.get('port'),() =>{
    console.log('listening on port ',app.get('port'))
})