

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    console.log('rea')
  try {
    
    if (req?.cookies?.token) {
      const token = req.cookies.token;
      console.log(token)
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded)
      const { name, role } = decoded;
      console.log(name)

      res.status(200).json({ name,role});
    } else {
      
      res.status(200).json({ admin: false });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});