require('dotenv').config();

const bcrypt = require('bcrypt');
const { Connection } = require('../config/connection');
const { User } = require('../models/User.models');
const { ROLES } = require('../constants/roles');

const createSuperAdmin = async () => {
    await Connection.connect();

    const existing = await User.findOne({ role: 'SUPER_ADMIN' });
    if (existing) {
        console.log(' Super Admin already exists.');
        return;
    }

    const hashedPassword = await bcrypt.hash('Admin@123', 10);
    const newUser = new User({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: ROLES.SUPER_ADMIN,
        isActive: true
    });

    await newUser.save();
    console.log('Super Admin created successfully!');
};

createSuperAdmin();
