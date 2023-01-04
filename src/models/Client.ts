import mongoose, { Document, Schema } from 'mongoose';
export interface IClient {
    
}
export interface IClientModel extends IClient, Document {
    
}
const ClientSchema: Schema = new Schema ({
    
},{
    versionKey: false
});
export default mongoose.model<IClientModel>('Client', ClientSchema);