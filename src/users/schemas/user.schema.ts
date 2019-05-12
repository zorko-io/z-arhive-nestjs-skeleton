import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
   email: {type: String, unique: true, required: true}
});
