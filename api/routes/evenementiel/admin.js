const express = require("express");
const router = express.Router();
const adminController=require('../../controllers/evenementiel/admin')
const { checkToken } = require("../../auth/token_validation")


router.post("/login", adminController.getAdminByEmail);

router.get("/",checkToken, adminController.getAdmin);

router.patch("/", checkToken, adminController.updateAdmin);


module.exports = router;

 