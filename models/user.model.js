import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'User Name is required'],
        trim: true,
        minLength: 2,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'User Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: [true, 'User Password is required'],
        minLength: 6,
    },
}, { timestamps: true });
        
const User = mongoose.model('User', userSchema);

export default User;


// Usage example:
// {name: 'John Ronald', email: 'johnny@gmail.com', password: 'password }
