import User from "../../models/User";
import connectDb from "../../middleware/mongoose";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  // res.setHeader(
  //   "Access-Control-Allow-Origin",
  //   // "https://codeswear-gamma.vercel.app"
  //   "https://radagast.vercel.app.app"

  // );
  // res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  // res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // if (req.method === "OPTIONS") {
  //   // Handle preflight request
  //   res.status(200).end();
  //   return;
  // }

  if (req.method === "POST") {

    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password,process.env.AES_SECRET);
  
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == originalText) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "24h" }
        );
        res.status(200).json({ Success: "success", token });
      } else {
        res.status(400).json({ error: "email or password is incorrect" });
      }
    } else {
      res.status(400).json({ error: "No user found" });
    }
  } else {
    res
      .status(400)
      .json({ error: "this method is not allowed for this route" });
  }
};
export default connectDb(handler);
