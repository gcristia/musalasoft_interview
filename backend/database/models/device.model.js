import mongoose from 'mongoose'

const { Schema } = mongoose

const deviceSchema = new Schema(
    {
        uid: {
            type: Number,
            required: true,
        },
        vendor: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

deviceSchema.method('toJSON', function () {
    const { updatedAt, ...object } = this.toObject()
    return object
})

export default mongoose.model('Device', deviceSchema)
