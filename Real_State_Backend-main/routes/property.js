const express = require("express");
const propertyRouter = express.Router();
const Property = require("../model/property_schema");
const auth = require('../Auth/authorization');
const multer = require("multer");
const path = require("path");




//  Giving path and file name  for newly added file in multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads")
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage });




////To get property list on home page frontend


propertyRouter.get("/v1/getproperty", auth, (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;


    Property.find().skip(skip).limit(limit).then(result => {
        res.status(200).json({
            message: "Property details fetched successfully",
            data: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    })
})







//Get API for search



propertyRouter.get("/v1/getproperty/:id",auth,(req,res)=>{
    const id = req.params.id.toUpperCase();


    Property.findOne({ ppdid: id }).then(result => {
        if (result) {
            res.status(200).json({
                data: result
            })
        } else {
            res.status(400).json({
                message: "Id not Found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error!!",
            Err: err
        })
    })
})






///post API to Add New Property

propertyRouter.post("/v1/addproperty", auth, upload.single("propertyimage"), async (req, res) => {

    console.log("reached post")
    let newppdid = 0; // it will store digit of last inserted of ppd_id
    let ppd_id; // 

    // This function will return the last document inserted into the DB
    const existingProperty = await Property.findOne({}, {}, { sort: { _id: -1 } }, function (err, post) {
        return post;
    });


    if (existingProperty !== null) {

        for (let i = 3; i < existingProperty.ppdid.length; i++) {
            // Running loop to store ppdid of last added property to db 
            newppdid += existingProperty.ppdid[i];

        }
        ppd_id = "PPD" + (parseInt(newppdid) + 1);  // increment for new insert

    } else {
        ppd_id = "PPD" + 1000; // if there is not any previous  property in DB
    }

    const data = req.body;  // need to provide data in body

    const views = parseInt(Math.random() * 30);
    const daysleft = parseInt(Math.random() * 40);
    const propertyData = new Property({ //add new property

        user: req.id,     // get id from token passed during auth
        unique_id: req.unique_id,   // get id from token auth
        ppdid: ppd_id,
        views: views,
        daysleft: daysleft,
        status: "unsold",

        image: req.file.filename, // coming from multer
        property_type: data.property_type,
        price: data.price,
        property_age: data.property_age,
        property_description: data.property_description,

        negotiable: data.negotiable,
        ownerShip: data.ownerShip,
        property_approved: data.property_approved,
        bank_loan: data.bank_loan,
        length: data.length,
        breath: data.breath,
        area: data.area,

        area_unit: data.area_unit,
        bhk: data.bhk,
        floor: data.floor,
        attached: data.attached,
        western: data.western,
        furnished: data.furnished,
        parking: data.parking,

        lift: data.lift,
        electricity: data.electricity,
        facing: data.facing,
        owner_name: data.owner_name,
        mobile: data.mobile,
        postedby: data.postedby,
        saletype: data.saletype,

        featured: data.featured,
        ppdpackage: data.ppdpackage,
        email: data.email,
        city: data.city,
        addressarea: data.addressarea,
        pincode: data.pincode,

        address: data.address,
        landmark: data.landmark,
        longitude: data.longitude,
        latitude: data.latitude
    })

    propertyData.save().then(rec => {
        res.status(200).json({
            message: "data saved sucessfully"
        })
    })

        .catch(err => {
            res.status(500).json({
                message: "unable to save data",
                // detail: err   //this line to be used to check error
            })
            console.log(err);
        })
})











propertyRouter.put("/v1/updateproperty/:id",upload.single("propertyimage"), async (req, res) => {
console.log("update")
    try {
        const propertyId = req.params.id; // would look into param for data
        let updatedData = req.body;
        if(req.file){
         updatedData.image = req.file.filename
        }
        const updateStatus = await Property.findByIdAndUpdate(propertyId, updatedData, { new: true });
        if (!updateStatus) {
            res.status(400).json({
                message: "No such Id found"
            })
        }
        res.status(200).json(updateStatus) // would return updated data
        console.log(updateStatus)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "internal server error"
        })
    }

})












///API called when sold button pressed

propertyRouter.patch("/v1/sold/:id", auth, (req, res) => {

    const soldId = req.params.id;
    Property.findByIdAndUpdate({ _id: soldId }, { status: "sold", daysleft: 0 },{new:true}).then(result => {
        res.status(200).json({
            message: "This property has been sold",
            data : result
        })
    }).catch(err => {
        res.status(400).json({
            message: err.message
        })
    })
})







propertyRouter.delete("/v1/:id", (req, res) => {
    Property.deleteOne({ _id: req.params.id }).then(response => {
        if (response.deletedCount) {
            res.status(200).json({
                message: "Deleted Successfully",
                data: response
            })
        } else {
            res.status(400).json({
                message: "Id not found"
            })
        }
    }).catch(err => {
        res.status(500).json({
            message: "Internal server error.."
        })
    })
})



module.exports = propertyRouter;
