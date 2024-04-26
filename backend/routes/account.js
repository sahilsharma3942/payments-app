const express = require("express");
const authMiddleware = require('../middleware');
const {Account} = require('../db');
const mongoose = require('mongoose');

const router = express.Router();


router.get('/balance',authMiddleware,async (req,res)=>{
    const account = await Account.findOne({
        userId : req.userId
    });

    if(account){
        res.json({
            balance: account.balance
        });
    }
})




router.post('/transfer',authMiddleware, async(req,res)=>{
    const session  = await mongoose.startSession();
    session.startTransaction();

    const {to,amount} = req.body;
    const account = await Account.findOne({
        userId: req.userId
    }).session(session);
    if(account.balance<amount){
        await session.abortTransaction();
        res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId: to
    }).session(session);
    if(!toAccount){
        session.abortTransaction();
        res.status(400).json({
            message:"Invalid Account"
        })
    }
    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{ balance : -amount}
    }).session(session);

    await Account.updateOne({
        userId: to
    },{
        $inc:{balance: amount}
    }).session(session);


    await session.commitTransaction();
    res.status(200).json({
        message: "Transfer Successful"
    })
})


module.exports = router;