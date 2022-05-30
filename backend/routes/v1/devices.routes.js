import { Router } from 'express'

import DevicesController from '../../controllers/devices.controller.js'
import { validateCreate, validateGatewayID, validateIDs } from '../../validators/device.validator.js'

const v1DevicesRouter = Router()

v1DevicesRouter.post('/:gatewayId/create', validateGatewayID, validateCreate, DevicesController.create)
v1DevicesRouter.delete('/:gatewayId/device/:id', validateIDs, DevicesController.delete)
v1DevicesRouter.get('/', DevicesController.all)

export default v1DevicesRouter
