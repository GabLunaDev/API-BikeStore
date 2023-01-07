import mongoose, { Document, Schema } from 'mongoose';
import Address from './Address';
export interface IClient {
    name: string;
    age: number;
    cellphone: string;
    email: string;
    password: string;
    address: any;
}

export interface IClientModel extends IClient, Document {}

const ClientSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        cellphone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: Address,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IClientModel>('Client', ClientSchema);
