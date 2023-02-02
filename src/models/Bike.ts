import mongoose, { Document, Schema } from 'mongoose';

export interface IBike {
    name: string;
    price: number;
    manufacturer: string;
    size: [string];
    color: [string];
    wheels_size: [number];
}

export interface IBikeModel extends IBike, Document {}

const BikeSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        manufacturer: {
            type: String,
            required: true
        },
        size: {
            type: [String],
            required: true
        },
        color: {
            type: [String],
            required: true
        },
        wheels_size: {
            type: [Number],
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IBikeModel>('Bike', BikeSchema);
