import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    googleId: { type: String, index: true },
    refreshToken: { type: String },
}, {
    timestamps: true,
});
UserSchema.index({ email: 1 }, { unique: true });
const UserModel = mongoose.model('User', UserSchema);
export default UserModel;
