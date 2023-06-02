import  express  from "express";
import { instance } from "../index.js";
import crypto from "crypto"
const router = express.Router();

// creating the order
router.post("/checkout", async (req,res)=>{
    try{
        console.log(req.body)
        const options={
            amount: Number(req.body.amount * 100),
            currency:"INR"
        }
    
        const order = await instance.orders.create(options);
        console.log(order);
        res.status(200).json(({success:true,
            order,}))
    }catch(err){
        console.log(err);
        res.status(400).json({
            message:"error is there"
        })
    }
    
})

router.post("/paymentVerification",async(req,res)=>{
    try{
        const {razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
        

        let body = razorpay_order_id + "|" + razorpay_payment_id;

        
        var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
                                        .update(body.toString())
                                        .digest('hex');

        // console.log("sig received " ,razorpay_signature);
        // console.log("sig generated " ,expectedSignature);
        
        if(expectedSignature === razorpay_signature){
            // save all values in database 

            // res.redirect(`http://localhost:3002/paymentsuccess=${razorpay_payment_id}`)
            res.redirect(`http://localhost:3000/home`)

        }else{
            res.status(400).json({message:"false request"})
        }
        
        

    }catch(e){
        console.log(e);
    }
})

export default router;
