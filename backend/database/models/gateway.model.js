import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const { Schema } = mongoose

const gatewaySchema = new Schema(
    {
        serial: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        ipv4: {
            type: String,
            required: true,
        },
        devices: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Device',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

gatewaySchema.path('devices').validate(function (value) {
    if (value.length > 10) {
        throw new Error("The number of devices in a Gateway can't be greater than 10!")
    }
})

gatewaySchema.plugin(uniqueValidator)

gatewaySchema.method('toJSON', function () {
    const { updatedAt, ...object } = this.toObject()
    return object
})

export default mongoose.model('Gateway', gatewaySchema)
