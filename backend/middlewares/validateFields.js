import { validationResult } from 'express-validator'

const validateFields = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        res.status(400).send({ errors: err.array({ onlyFirstError: true }) })
    }
}

export default validateFields
