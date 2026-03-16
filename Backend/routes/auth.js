const express = require("express")
const router = express.Router()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")


router.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        isVerified: false
    })

    await newUser.save()

    const token = jwt.sign(
        { id: newUser._id },
        "secretkey"
    )

    res.json({
        message: "user registered",
        verifyToken: token
    })
})



router.post("/login", async (req, res) => {

    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    if(!user){
        return res.send("user not found")
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        return res.send("password incorrect")
    }

    // if(!user.isVerified){
    //     return res.send("Please verify your email first")
    // }

    const token = jwt.sign(
        { id: user._id },
        "secretkey"
    )

    res.json({
        message: "login successful",
        token: token
    })
})


router.get("/verify/:token", async (req, res) => {

    try{

        const decoded = jwt.verify(req.params.token, "secretkey")

        const user = await User.findById(decoded.id)

        if(!user){
            return res.send("User not found")
        }

        user.isVerified = true
        await user.save()

        res.send("Email verified successfully")

    }catch(err){

        res.send("Invalid verification token")

    }

})



router.get("/profile", authMiddleware, async (req, res) => {

    const user = await User.findById(req.user.id)

    res.json({
        name: user.name,
        email: user.email
    })

})

module.exports = router