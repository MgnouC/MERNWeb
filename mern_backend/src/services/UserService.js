const User = require("../models/UserModel")
const  bcrypt = require("bcrypt");
const { generalAccessToke, generalAccessToken } = require("./JwtService");


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne({email})
            if(checkUser) { 
                reject({message: "Email already exists", status: 400})
            }
            const  hashedPassword = await bcrypt.hash(password, 10)
            console.log(hashedPassword)
            const createUser = await User.create({
                name,
                email,
                password:  hashedPassword,
                phone
            })
            if(createUser){
                resolve({
                    status: 'OK',
                    message: "SUCCESS",
                    data:  createUser

                })
            }
        } catch (e) {
            reject(e)
        }

    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone } = userLogin
        try {
            const checkUser = await User.findOne({email})
            if(checkUser === null ) {
                reject({message: "Email not found", status: 400})
            }
            const comparePassword = await bcrypt.compare(password, checkUser.password)
            if(!comparePassword){
                reject ({ message: "Password is incorrect", status: 400})
            }
            const access_token = await generalAccessToken({
                id: checkUser.id,
                isAdmin : checkUser.isAdmin
            })
            const refresh_token = await  generalRefreshToken({
                id: checkUser.id,
                isAdmin : checkUser.isAdmin
            })
            resolve({
                status: 'OK',
                message: "SUCCESS",
                access_token,
                refresh_token
            })
        } catch (e) {
            reject(e)
        }

    })
}

module.exports = {
    createUser,
    loginUser
}