import mongoose, { Document, Schema } from 'mongoose';
export interface IEmployee {
    name: string;
    age: number;
    cellphone: string;
    email: string;
    password: string;
}
export interface IEmployeeModel extends IEmployee, Document {}
const EmployeeSchema: Schema = new Schema(
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
        }
    },
    {
        versionKey: false
    }
);
export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);
