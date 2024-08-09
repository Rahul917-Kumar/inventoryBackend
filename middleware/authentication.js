const jwt = require("jsonwebtoken")

const secretKey = "HIIAMRAHULKUMARDHYANICREATINGASSIGNMENTFORWENDOR"

const authenticationMiddleware = (req, res, next)=>{
    // Get the authorization header
    const authHeader = req.headers['authorization'];
    
    const token = authHeader && authHeader.split(' ')[1];
    console.log(token)
    if (token == null) {
        return res.status(401).json({ message: 'Token not provided' }); // No token found
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' }); // Token is invalid or expired
        }
        if(user.role!=="ADMIN"){
            return res.status(400).json({message:""})
        }
        // console.log(user)
        next()
    });
}

module.exports = authenticationMiddleware