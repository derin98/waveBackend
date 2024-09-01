const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true },
        passwordExpiresAt: { type: Date, default: Date.now },
        passwordAttempts: { type: Number, default: 0 },
        isBlocked: { type: Boolean, default: false },
        refreshToken: { type: String },
        refreshTokenExpiresAt: { type: Date },
        otp: { type: String },
        otpExpiresAt: { type: Date },
        otpAttempts: { type: Number, default: 0 },
    },
   
    role: { type: String, enum: Object.values(userRoles()), required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    updatedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: mongoose.SchemaTypes.Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});


userSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
    }
});


function userRoles () { 
    return {
        SUPER_ADMIN: 'Command Center',
        ADMIN: 'Chief',
        PROJECT_MANAGER: 'Strategist',
        HUMAN_RESOURCES: 'Culture Curator',
        DEVELOPER: 'Artisan',
        TESTER: 'Detective',
        INTERN: 'Future Leader'
    }
}

const Users = mongoose.model("User", userSchema, "users");
module.exports = { Users, userRoles };