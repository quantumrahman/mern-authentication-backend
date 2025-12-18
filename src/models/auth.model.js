// import modules ---------------------------------------->
import mongoose from 'mongoose';

// schema ------------------------------------------------>
const authSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required!'],
            minLength: [6, 'Name must be at least 6 characters!'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            match: [/^\S+@\S+\.\S+$/, 'Email is invalid!'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            minLength: [8, 'Password must be at least 8 characters!'],
            trim: true,
        },
        verification_otp: {
            type: String,
            default: '',
        },
        verification_otp_expires_at: {
            type: Number,
            default: 0,
        },
        is_verified: {
            type: Boolean,
            default: false,
        },
        reset_password_otp: {
            type: String,
            default: '',
        },
        reset_password_otp_expires_at: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// model ------------------------------------------------->
const authModel = mongoose.models.auth || mongoose.model('auth', authSchema);

// export modules ---------------------------------------->
export default authModel;
