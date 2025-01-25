const Location = require('../models/location.js');

const addLocation = async (req, res) => {
    try {
        const {
            locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime,
            coordinates
        } = req.body;

        const loc = await Location.create({
            locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime,
            coordinates
        });

        return res.status(200).json({
            msg: "Location Added",
            location: loc
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
};

const removeLocation = async (req, res) => {
    try {
        await Location.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            msg: "Location removed successfully"
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
};

const updateLocation = async (req, res) => {
    try {
        const {
            locationName,
            locationType,
            address,
            description,
            openTime,
            closeTime,
            coordinates
        } = req.body;

        const loc = await Location.findByIdAndUpdate(
            req.params.id,
            {
                locationName,
                locationType,
                address,
                description,
                openTime,
                closeTime,
                coordinates
            },
            { new: true } // Return the updated document
        );

        return res.status(200).json({
            msg: "Updated successfully",
            location: loc
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
};

const getAllLocations = async (req, res) => {
    try {
        const locs = await Location.find();
        return res.status(200).json({
            msg: "List of all locations",
            locations: locs
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
};

const getLocationById = async (req, res) => {
    try {
        const loc = await Location.findById(req.params.id);
        return res.status(200).json({
            location: loc
        });
    } catch (error) {
        return res.status(400).json({
            msg: "Something went wrong",
            error: error.message
        });
    }
};

const addReview=async(req,res)=>{
    try {
        const review={
          user:"temp@gmail.com",
          comment:req.body.comment,
          rating:req.body.rating  
        }
        const location = await Location.findById(req.params.id);
        location.reviews.push(review);
        await location.save();
        return res.status(200).json({
            message: "Review added successfully!",
            location,
        });
    } catch (error) {
        console.error("Error in addReview API:", error);
        return res.status(500).json({
            message: "An error occurred while adding the review.",
            error: error.message,
        });
    }
}

module.exports = {
    addLocation,
    removeLocation,
    updateLocation,
    getAllLocations,
    getLocationById,
    addReview
};
