const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config');
const authMiddleware = require('../middleware');




const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstname: zod.string(),
    lastname: zod.string()
})
//signup
router.post('/signup',async (req,res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({
        username: req.body.username
    });
    if(existingUser){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    })

    const userId = user._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    })


    const token = jwt.sign({
        userId
    },JWT_SECRET);

    res.json({
        message: "User created successfully",
	    token: token
    })
});





const signinSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
})
//signin
router.post('/signin',async (req,res) =>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    })

    if(user){
        const token = jwt.sign({
            userId : user._id
        }, JWT_SECRET);

        res.json({
            token: token
        });

        return;
    }

    res.status(411).json({
        message: "Error while logging in"
    })

})



//update user
const updateUserSchema = zod.object({
    password: zod.string().min(8).optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional()
})
router.put('/update',authMiddleware, async(req,res)=>{
    const {success} = updateUserSchema.safeParse(req.body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        });
    }
    await User.updateOne({_id:req.userId},req.body);
    res.json({
        message:"Updated Successfully"
    })

})


//get filtered users
 router.get('/bulk', async(req,res)=>{
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstname: {
                "$regex": filter
            }
        },{
            lastname : {
                "$regex":filter
            }
        }]
    })

    res.send(users);
 })





module.exports = router;