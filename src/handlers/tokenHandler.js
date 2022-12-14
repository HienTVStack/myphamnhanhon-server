const jsonwebtoken = require("jsonwebtoken");
const User = require("../models/Auth");
const Employee = require("../models/Employee");

const tokenDecode = (req) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ")[1];
        try {
            const tokenDecoded = jsonwebtoken.verify(bearer, process.env.TOKEN_SELECT_KEY);
            return tokenDecoded;
        } catch {
            return false;
        }
    } else {
        return false;
    }
};

exports.verifyToken = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const user = await User.findById(tokenDecoded.id);
        if (!user) return res.status(401).json("Unathorized");
        req.user = user;
        next();
    } else {
        res.status(401).json("Unathorized");
    }
};

exports.verifyTokenEmp = async (req, res, next) => {
    const tokenDecoded = tokenDecode(req);
    if (tokenDecoded) {
        const emp = await Employee.findById(tokenDecoded.id);
        if (!emp) return res.status(401).json("Unathorized");
        req.user = emp;
        next();
    } else {
        res.status(401).json("Unathorized");
    }
};
