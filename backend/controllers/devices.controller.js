import DeviceModel from '../database/models/device.model.js'
import GatewayModel from '../database/models/gateway.model.js'
import getValidatorError from '../helpers/getValidatorError.js'

const DevicesController = {
    create: async (req, res) => {
        const { gatewayId } = req.params
        const { uid, vendor, status } = req.body

        const newDevice = new DeviceModel({ uid, vendor, status })

        try {
            GatewayModel.findById({ _id: gatewayId }, async (err, gateway) => {
                if (gateway) {
                    gateway.devices.push(newDevice)

                    try {
                        await gateway.save({
                            validateModifiedOnly: true,
                        })
                        await newDevice.save()
                        res.status(201).json(newDevice)
                    } catch (error) {
                        res.status(400).send({
                            code: 'error/associating_device',
                            message: getValidatorError(error),
                        })
                    }
                } else {
                    res.status(500).send({
                        code: 'error/create_devices_and_associated with gateway',
                        message: 'The device was not associated with the gateway',
                    })
                }
            })
        } catch (error) {
            res.status(500).send({ error })
        }
    },

    all: async (req, res) => {
        try {
            const allDevices = await DeviceModel.find()
            res.status(200).json(allDevices)
        } catch (error) {
            res.status(500).send({
                code: 'error/get_all_devices',
                message: getValidatorError(error),
            })
        }
    },
    delete: async (req, res) => {
        const { gatewayId, id } = req.params

        try {
            await GatewayModel.updateOne({ _id: gatewayId }, { $pull: { devices: id } })
            const finDevice = await DeviceModel.findById(id)

            if (!finDevice) {
                res.status(404).send({
                    code: 'info/not_found',
                    message: 'Device not found',
                })
            } else {
                finDevice.remove()
                res.status(200).json(finDevice)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                code: 'error/delete_device_in_gateway',
                message: getValidatorError(error),
            })
        }
    },
}

export default DevicesController
