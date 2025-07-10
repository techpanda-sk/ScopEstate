const userServices = require("../services/user.services");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// create admin
const createSuperAdmin = async (req, res) => {
    try {
        const { name, email, password, role, isActive } = req.body;
        // console.log(name,email,password,role,isActive) // for testing 
        if (!email) {
            console.log('please require all feilds')
        }
        const bcrptPassword = await bcrypt.hash(password, saltRounds)
        const data = { name, email, password: bcrptPassword, role, isActive };

        const user = await userServices.createAdmin(data);
        console.log("user...", user)
    } catch (error) {
        return res.status(401).json({ message: "Error " })
    }
}

// login admin
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("all feilds are required!")
        }

        // const userdata = { email, password }
        // console.log(userdata)
        const data = await userServices.login(email)
        console.log("dadk",data)
        if (!data) {
            return res.status(401).json({ message: "" })
        }
        const isMatch = await bcrypt.compare(password, data.password)
        if (!isMatch) {
            return res.status(401).json({ message: "loging fields!" })
        }
        return res.status(200).json({ message: 'User Login SuccessFuly' })

    } catch (error) {
        return res.status(401).json({ message: "login feilds" })
    }
}


module.exports = { createSuperAdmin, loginUser };    