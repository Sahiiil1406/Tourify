const {addLocation,
    removeLocation,
    updateLocation,
    getAllLoaction,
    getLocationById}=require('../controllers/location')
    const express=require('express')
    const router=express()

router.get('/',getAllLoaction)
router.post('/',addLocation)
router.delete('/:id',removeLocation)
router.put('/:id',updateLocation)
router.get('/:id',getLocationById)

module.exports=router

