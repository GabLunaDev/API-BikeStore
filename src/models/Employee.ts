import mongoose, { Document, Schema } from 'mongoose';
export interface IEmployee {
    
}
export interface IEmployeeModel extends IEmployee, Document {
    
}
const EmployeeSchema: Schema = new Schema ({
    
},{
    
});
export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);