require('dotenv').config()
import jwt = require('jsonwebtoken')
import {RequestHandler} from 'express'

export const authMid: (() => RequestHandler) = (() => (req, res, next) => {
    const token: any = req.headers['x-access-token']
    const secret: string = process.env.SECRET
    if (!token)
        return res.status(401).send({message: 'no token provided'})

    jwt.verify(token, process.env.SECRET, (error, decodedToken) => {
        if (error)
            return res.status(500).send({message: 'invalid token'})
        next()
    })
})

export const loginMid: (() => RequestHandler) = (() => (req, res, next) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1)
        return res.status(401).json({ message: 'Missing Authorization Header' })
    next()
})