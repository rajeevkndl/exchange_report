const pathApi = require('../api/index')
const router = require('express').Router()


router.get('/', function(req,res){
    return res.json({message:"api working fine"})
 })

router.post('/api/addDataToDb', pathApi.addData)
router.get('/api/exchangeList', pathApi.getData)

 

module.exports = router