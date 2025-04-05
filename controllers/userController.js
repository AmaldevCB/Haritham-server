const users = require('../model/userModel')
const jwt = require('jsonwebtoken')
// const stripe = require("stripe");
const requests = require('../model/requestModel');
const complaints = require('../model/complaintModel');

// register
exports.register = async (req, res) => {
    console.log('inside register controller');

    const { username, phonenumber, password, address } = req.body
    console.log(username, phonenumber, password, address);

    try {
        const existinguser = await users.findOne({ phonenumber })
        if (existinguser) {
            res.status(406).json('user already exist')
        } else {
            const newuser = new users({
                username, phonenumber, password, address
            })
            await newuser.save()
            res.status(200).json(newuser)
        }
    } catch (error) {
        res.status(401).json(error)
    }
}

// login
exports.login = async (req, res) => {
    console.log('inside login controller');

    const { phonenumber, password } = req.body
    console.log(phonenumber, password);
    try {
        const existinguser = await users.findOne({ phonenumber, password })
        if (existinguser) {
            const token = jwt.sign({ userId: existinguser._id }, "shhh")
            res.status(200).json({ existinguser, token })
        } else {
            res.status(406).json('incorrect phoneNumber or password')

        }

    } catch (error) {
        res.status(401).json(error)
    }

}

// new request
exports.newRequest = async (req, res) => {
    console.log("Inside request controller");

    try {

        const newRequest = new requests(req.body);
        await newRequest.save();
        
        res.status(200).json(newRequest);
    } catch (error) {
        res.status(401).json(error);
    }
};

// status
exports.status=async(req,res)=>{
    console.log('inside status controller');

    const {phonenumber}=req.body

    try {
        const allRequest = await requests.find({phonenumber})
        res.status(200).json(allRequest)
    } catch (error) {
        res.status(401).json(error);
    }
    
}

// post complaint
exports.complaint=async(req,res)=>{
    console.log('inside status controller');

    const {phonenumber}=req.body

    try {
        const newComplaint = new complaints(req.body);
        await newComplaint.save();
        
        res.status(200).json(newComplaint);
    } catch (error) {
        res.status(401).json(error);
    }
    
}

// edit profile
exports.editProfile=async(req,res)=>{
    console.log('inside edit profile controller');

    const userId = req.payload

    const {username,phonenumber,password,address}=req.body

    try {
        const existingUser=await users.findByIdAndUpdate({_id:userId},{
            username,phonenumber,password,address
        },{new:true})
        await existingUser.save()
        res.status(200).json(existingUser)        
    } catch (error) {
        res.status(401).json(error);

    }
    
}


