import { Router } from 'express'
import GatewaysController from '../../controllers/gateways.controller.js'
import { validateGatewayID, validateCreate } from '../../validators/gateway.validator.js'

const v1GatewaysRouter = Router()

v1GatewaysRouter.get('/', GatewaysController.all)
v1GatewaysRouter.get('/:id', validateGatewayID, GatewaysController.find)
v1GatewaysRouter.get('/:id/devices', validateGatewayID, GatewaysController.getAllDevices)
v1GatewaysRouter.post('/create', validateCreate, GatewaysController.create)
v1GatewaysRouter.delete('/:id', validateGatewayID, GatewaysController.delete)

export default v1GatewaysRouter
