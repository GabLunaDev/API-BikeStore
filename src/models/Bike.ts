import mongoose, { Document, Schema } from 'mongoose';

export interface IBike {
    name: string;
}

export interface IBikeModel extends IBike, Document {}

const BikeSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IBikeModel>('Bike', BikeSchema);
