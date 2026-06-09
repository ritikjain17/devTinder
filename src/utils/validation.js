const validator = require("validator")

const validationSignData = (req) => {

    const {firstName, lastName , password , email} = req.body;


    if(!firstName || !lastName){
        throw new Error("Name is not valid !")
    }else if (!validator.isEmail(email)){
        throw new Error("Please Enter a valid Email !");
    }else if (!validator.isStrongPassword(password)){
        throw new Error("Your password is not strong !")
    }
}


module.exports = {
    validationSignData
}