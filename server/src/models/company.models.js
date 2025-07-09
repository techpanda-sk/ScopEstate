import mongoose from 'mongoose';

const { Schema } = mongoose;
const companySchema = new Schema({
    companyName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        default: '',
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    ownerName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        default: '',
    },
    companyType: {
        type: String,
        enum: ['Private Limited', 'Partnership', 'Sole Proprietorship', 'LLP', 'Other'],
        required: true,
    },
    establishedAt: {
        type: Date,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Company', companySchema);
