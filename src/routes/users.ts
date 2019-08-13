import express = require('express');
import {UserService} from '../services/user.service'
import {loginMid} from '../middlewares/auth.middleware'

const userRoutes = express.Router();
const user = new UserService()

userRoutes.post('/', (req, res, next) => {
    user.createUser(
        req.body.name, 
        req.body.username, 
        req.body.password
    )
    .then((userCreated) => {
        if (userCreated.message)
            res.status(401).json(userCreated)
        res.status(201).json({message:`User ${userCreated.username} created with the ${userCreated.id} id.`})
    })
    .catch((error) => res.status(500).json({message:`Oops, there is some errors here. Come back again later.`}))
})

userRoutes.get('/', loginMid(), async (req, res, next) => {
    const credentials = user.getCredentials(req.headers.authorization)

    const loginResult = await user.login(credentials.username, credentials.password)

    if (!loginResult)
        res.status(401).json({message: "bad credentials"})

    res.status(200).json(loginResult)
})

export default userRoutes

