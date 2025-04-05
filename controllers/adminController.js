const jwt = require('jsonwebtoken');
const users = require('../model/userModel');
const requests = require('../model/requestModel');
const complaints = require('../model/complaintModel');


// admin login
exports.adminLoginController = (req, res) => {
    console.log('inside admin login controller');

    const { password } = req.body

    try {
        if (password == process.env.adminPassword) {
            const token = jwt.sign({ admin: "harithamAdmin" }, "shhh")
            res.status(200).json(token)
        } else {
            res.status(406).json('failed')

        }

    } catch (error) {
        res.status(401).json(error)
    }
}

// get user details
exports.getUserController = async (req, res) => {
    console.log('inside get user controller');

    try {
        const allUsers = await users.find()
        console.log(allUsers);
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get request details
exports.getrequestController = async (req, res) => {
    console.log('inside get request controller');

    try {
        const request = await requests.find()
        console.log(request);
        res.status(200).json(request)
    } catch (error) {
        res.status(401).json(error)
    }
}

// get complaint details
exports.getcomplaintController = async (req, res) => {
    console.log('inside get complaint controller');

    try {
        const complaint = await complaints.find()
        console.log(complaint);
        res.status(200).json(complaint)
    } catch (error) {
        res.status(401).json(error)
    }
}

// approve request
exports.approveRequestController=async(req,res)=>{
    console.log('inside approve request controller');

    const {_id,status}=req.body

    try {
        const request= await requests.findByIdAndUpdate({_id},{status},{new:true})
        await request.save()
        res.status(200).json(request)
    } catch (error) {
        res.status(401).json(error) 
    }
    
}

// delete request
exports.deleteController=async(req,res)=>{
    console.log('inside delete controller');

    const {_id}=req.body

    try {
        const result = await complaints.findByIdAndDelete(_id)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(401).json(error)  
    }
    
}
