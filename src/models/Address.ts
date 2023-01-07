import mongoose, { Document, Schema } from 'mongoose';

export interface IAddress {
    street: string;
    number: string;
    completition: string;
    reference: string;
}

export interface IAddressModel extends IAddress, Document {}

const AddressSchema: Schema = new Schema(
    {
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        completition: {
            type: String,
            required: true
        },
        reference: {
            type: String,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IAddressModel>('Address', AddressSchema);
