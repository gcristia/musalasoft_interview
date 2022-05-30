import { check, param } from 'express-validator'
import validateResult from '../middlewares/validateFields.js'
import mongoose from 'mongoose'

const validateCreate = [
    check('uid').exists().not().isEmpty().isNumeric(),
    check('vendor').exists().not().isEmpty(),
    check('status').exists().not().isEmpty().isBoolean(),
    validateResult,
]

const validateGatewayID = [
    param('gatewayId')
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

const validateIDs = [
    param('gatewayId')
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
    param('id')
        .exists()
        .not()
        .isEmpty()
        .withMessage('Incorrect ID Gateway')
        .custom((value) => {
            const ObjectId = mongoose.Types.ObjectId
            if (!ObjectId.isValid(value)) {
                throw new Error('Incorrect ID Device')
            }
            return true
        }),
    validateResult,
]

export { validateCreate, validateGatewayID, validateIDs }
