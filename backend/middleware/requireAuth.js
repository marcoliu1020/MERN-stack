const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
    // frontend will send authorization in headers
    // console.log(req.headers)

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization token required' })
    }

    // get a string and parse it
    // authorization = 'Bearer asdfasdfasdf.h4kj3hl4kjh34.lkjhkjuhiu32h5234234234'
    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id') // attached to req.user
        // { _id: new ObjectId("62f24b3bce1dbcbfced71d1f") }
        
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Request is not authorized' })
    }
}

module.exports = requireAuth