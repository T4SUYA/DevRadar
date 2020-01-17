const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringAsArray')

module.exports = {
    async index(req,res) {
        const devs = await Dev.find()
        return res.json(devs)
    },

    async store (req,res) {
        let {github_username,techs, latitude,longitude} = req.body
        github_username = github_username.toLowerCase()

        const techsArray = techs.split(',').map(tech => tech.trim())

        const dev = await Dev.findOne({github_username})

        if(dev) return res.json(dev)

        let response = {}
        try {
            response = await axios.get(`https://api.github.com/users/${github_username}`)
        } catch (error) {
           return res.json({
               "message": error.message
           })
        }
        const location = {
            type: 'Point',
            coordinates: [
                longitude,
                latitude
            ]
        }
        const {avatar_url, bio, name} = response.data
        const newDev = await Dev.create({
            name,
            github_username,
            bio,
            avatar_url,
            techs: techsArray,
            location
        })
        return res.send(newDev)
    },
    async delete(req,res) {
        const {github_username} = req.body
        const {_id} = await Dev.findOne({
            github_username
        })
        try {
            await Dev.findByIdAndDelete({
                _id
            })
        } catch (error) {
            return res.json({error})
        }

        res.json({message: `User ${github_username} has been deleted`})
    },
    async update(req,res) {
        const {github_username} = req.body
        const {name} = req.query
        const {_id} = await Dev.findOne({
            github_username
        })
        try {
            await Dev.findByIdAndUpdate({
                _id
            }, {
                name
            })
        } catch (error) {
            return res.json({error})
        }

        res.json({message: `User ${github_username} has been updated`})
    }
}