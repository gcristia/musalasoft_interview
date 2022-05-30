import GatewayModel from '../database/models/gateway.model.js'
import getValidatorError from '../helpers/getValidatorError.js'
import DeviceModel from '../database/models/device.model.js'

const GatewaysController = {
    create: async (req, res) => {
        const { serial, name, ipv4 } = req.body

        const newGateway = new GatewayModel({
            serial,
            name,
            ipv4,
            devices: [],
        })

        try {
            const saveGateway = await newGateway.save()
            res.status(201).json(saveGateway)
        } catch (error) {
            res.status(400).send({
                code: 'error/create_gateway',
                message: getValidatorError(error),
            })
        }
    },

    find: async (req, res) => {
        const { id } = req.body
        try {
            const found = await GatewayModel.findById(id)
            if (!found) {
                res.status(404).send({
                    code: 'info/not_found',
                    message: 'Gateway not found',
                })
            } else {
                res.status(200).json(found)
            }
        } catch (error) {
            res.status(500).send({
                code: 'error/find_gateway',
                message: getValidatorError(error),
            })
        }
    },

    all: async (req, res) => {
        try {
            const allGateway = await GatewayModel.find().populate('devices', 'uid vendor createdAt status')
            res.status(200).json(allGateway)
        } catch (error) {
            res.status(500).send({
                code: 'error/get_all_gateways',
                message: getValidatorError(error),
            })
        }
    },

    getAllDevices: async (req, res) => {
        const { id } = req.params

        try {
            const foundGateway = await GatewayModel.find({
                _id: id,
            }).populate('devices', 'uid vendor createdAt status')

            res.status(200).json(foundGateway)
        } catch (error) {
            res.status(500).send({
                code: 'error/get_all_devices_gateway',
                message: getValidatorError(error),
            })
        }
    },
    delete: async (req, res) => {
        const { id } = req.params

        try {
            const foundGateway = await GatewayModel.findById(id)

            if (!foundGateway) {
                res.status(404).send({
                    code: 'info/not_found',
                    message: 'Gateway not found',
                })
            } else {
                foundGateway.devices.forEach((device) => {
                    DeviceModel.findByIdAndRemove(device.toString()).exec()
                })

                foundGateway.remove()

                res.status(200).json(foundGateway)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                code: 'error/delete_gateway',
                message: getValidatorError(error),
            })
        }
    },
}

export default GatewaysController
