const express = require("express")
const router  = express.Router();
const authControllers = require("../../controllers/auth/authController");
const { registerSchema, loginSchema } = require("../../validator/validationSchemas");
const validator = require("express-joi-validation").createValidator({});

const auth = require("./../../middleware/auth");


// register router
router.post(
    "/register", 
    validator.body(registerSchema), 
    authControllers.controllers.registerController
);

// login router
router.post(
    "/login", 
    validator.body(loginSchema), 
    authControllers.controllers.loginController
)

// Test JWT token varification middleware 
router.get("/verify-token", auth, (req, res)=>{
    res.send("Verified")
})

module.exports = router;