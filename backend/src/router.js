const express = require('express')
const router = express.Router()
const DevControler = require('./controllers/DevController')
const SearchController = require('./controllers/SearchController')

//DEV CONTROLLERS
router.get('/devs',DevControler.index )
router.delete('/devs', DevControler.delete)
router.post('/devs', DevControler.store)
router.put('/devs', DevControler.update)

//SEARCH CONTROLLER
router.get('/search', SearchController.index)


module.exports = router