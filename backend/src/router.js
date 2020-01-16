const express = require('express')
const axios = require('axios')
const router = express.Router()
const Dev = require('./models/Dev')

router.get('/', (req,res) => {
    return res.send("Ta funcionando po")

})

router.post('/devs', async (req,res) => {
    let {github_username} = req.body
    github_username = github_username.toLowerCase()
    let response = {}
    try {
        response = await axios.get(`https://api.github.com/users/${github_username}`)
    } catch (error) {
       return res.json({
           "message": error.message
       }).send()
    }
     
    const {avatar_url, bio, name} = response.data
    const newDev = await Dev.create({
        name,
        github_username,
        bio,
        avatar_url,
        techs: [
            "Node","Java"
        ]
    })
    return res.send(newDev)
})


module.exports = router