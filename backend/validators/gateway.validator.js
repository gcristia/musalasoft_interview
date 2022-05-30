import mongoose from 'mongoose'
import { check, param } from 'express-validator'
import validateResult from '../middlewares/validateFields.js'
import isIpv4Valid from '../helpers/isIpv4Valid.js'

const validateCreate = [
    check('serial').exists().not().isEmpty().isLength({ min: 10 }).withMessage('Must be at least 10 chars long'),
    check('name').exists().not().isEmpty(),
    check('ipv4')
        .exists()
        .not()
        .isEmpty()
        .custom((value) => {
            if (!isIpv4Valid(value)) {
                throw new Error('Ipv4 Incorrect')
            }
            return true
        }),
    validateResult,
]

const validateGatewayID = [
    param('id')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Incorrect ID Gateway')
        .custom((value) => {
            const ObjectId = mongoose.Types.ObjectId
            if (!ObjectId.isValid(value)) {
                throw new Error('Incorrect ID Gateway')
            }
            return true
        }),
    validateResult,
]

export { validateCreate, validateGatewayID }
