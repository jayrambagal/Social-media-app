import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();


router.post('/register',register)
router.post("/login", login);


router.get('/login', (req,res)=>{
    res.status(201).json({message:"hello jay"})
    console.log("hello get");
})

export default router;