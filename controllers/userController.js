const User = require('../models/userModel.js')

exports.home = (req, res) => {
    res.send('Hello World!');
}

exports.createUser = async(req, res) => {
    // extract info
    try {
    const {name, email} = req.body;

    if(!name || !email){
        return res.status(400).json({  // Use return to exit early
            success: false,
            message: "Name and email are required"
        });
    }

    const userExists = await User.findOne({email});  // Add await here

    if(userExists){
        return res.status(400).json({
            success: false,
            message: "User already exists"
        });
    }

    const user = await User.create({
        name,
        email
    });

    res.status(201).json({
        success: true,
        message: "User created Successfully",
        user
    });

    } catch (error) {
        console.error(error);  // Use error for server logs
        res.status(500).json({  // 500 for unexpected errors
            success: false,
            message: error.message,
        });
    }


}

exports.getUsers = async(req, res) => {
    try {
        const users = await User.find({})

        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
        
    }
}

exports.deleteUser = async(req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message,
        })
    }
}