require('dotenv').config()
import {User} from '../database/models/users'
import bcrypt = require('bcrypt')
import jwt = require('jsonwebtoken')

export class UserService {
    private readonly _saltRounds = 12

    async createUser(name: string, username: string, plainPassword: string) {
        const user = await this.findUser(username)
        if (user)
            return {message: "Username already in use."}
        const password = await this.generatePasswordHash(plainPassword, this._saltRounds)

        return User.create({
            name,
            username,
            password
        })
    }

    async login(username: string, plainPassword: string) {
        let user = await this.findUser(username)
        if (user) {
            const accessToken = await this.generateAccessToken(user.id, process.env.SECRET)
            const userFound = await this.comparePasswords(plainPassword, user.password)
            const loginObject = {
                name: user.name,
                username: user.username,
                id: user.id,
                token: accessToken
            }
            return userFound ? loginObject : null
        } else {
            return {message: "User not foud"}
        }
    }

    private generatePasswordHash(password: string, salt: number) {
        return bcrypt.hash(password, salt)
    }

    private comparePasswords(plainPassword: string, password: string) {
        return bcrypt.compare(plainPassword, password)
    }

    private findUser(username: string) {
        return User.findOne({where:{username}})
    }

    public getCredentials(authorization: string) {
        const base64Credentials =  authorization.split(' ')[1];
        const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
        return {
            username: credentials.split(':')[0],
            password: credentials.split(':')[1]
        }
    }

    private generateAccessToken(userId: number, secret: string) {
        return jwt.sign({data: userId}, secret, { expiresIn: '1h' })
    }
}
