const {addLocation,
    removeLocation,
    updateLocation,
    getAllLocations,
    getLocationById}=require('../controllers/location.js')
    const express=require('express')
    const router=express()

router.get('/',getAllLocations)
router.post('/',addLocation)
router.delete('/:id',removeLocation)
router.put('/:id',updateLocation)
router.get('/:id',getLocationById)

module.exports=router

