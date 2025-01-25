const Location=require('../models/location.js')

const addLocation=async(req,res)=>{
    try {
        const {locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime }=req.body;
        const loc=await Location.create({
            locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime
      })
      return res.status(200).json({
        msg:"Location Added",
        location:loc
      })
    } catch (error) {
        return res.status(400).json({
            msg:"something went wrong",
            error:error
        })
    }

}
const removeLocation=async(req,res)=>{
    try {
       
        await Location.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            msg:"Location removed Successfully"
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"something went wrong",
            error:error
        })  
    }
}
const updateLocation=async(req,res)=>{
    try {
        const {locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime
        }=req.body;
        const loc=await Location.findByIdAndUpdate(req.params.id,{locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime
        })
        return res.status(200).json({
            msg:"Updated Succesfully",
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"something went wrong",
            error:error
        })
    }
}
const getAllLoaction=async(req,res)=>{
    try {
        const locs=await Location.find()
        return res.status(200).json({
            msg:"List of All Locations",
            locations:locs
        })
        
    } catch (error) {
        return res.status(400).json({
            msg:"something went wrong",
            error:error
        })
    }
}
const getLocationById=async(req,res)=>{try {
    const loc=await Location.findById(req.params.id)
    return res.status(200).json({
        location:loc
    })
    
} catch (error) {
    return res.status(400).json({
        msg:"something went wrong",
        error:error
    })
}}

module.exports={
    addLocation,
    removeLocation,
    updateLocation,
    getAllLoaction,
    getLocationById
}

