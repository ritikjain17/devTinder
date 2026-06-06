
const adminAuth = (req, res, next) =>{

    token = "xyzoiudhiwugdyt";
    isAdminAuthorize = token === "xyz";
    if(!isAdminAuthorize){
        res.status(401).send("Admin is not authorized");
    }else{
        next()
    }
}

const userAuth = (req, res , next) => {
    token  = "abc";
    isUserAuthorize = token === "abc";
    if(!isUserAuthorize){
        res.status(401).send("user is not authorized to access the data");
    }else{
        next()
    }
}

module.exports = {adminAuth , userAuth}