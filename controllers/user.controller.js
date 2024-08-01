import { UserModel } from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


///api/v1/users
const register = async(req, res) => {
    try {
        
        const { username, email, password } = req.body;

        if(!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, username"})
        }

        const user = await UserModel.findOneByEmail(email)
        if(user) {
            return res.status(409).json({ ok: false, msg: "Email already exists" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await UserModel.create({ email, password: hashedPassword, username })

        const token = jwt.sign({
            email: newUser.email
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h'
        }
    )

        return res.status(201).json({ ok: true, msg: token })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }

}

///api/v1/users
const login = async(req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }

}


export const UserController = {
    register,
    login
}