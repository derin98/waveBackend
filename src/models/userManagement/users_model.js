const mongoose = require("mongoose");

const { constants: { countryAndCallingCodeConstants: { countryCodesObject }
    , userManagementConstants: { userConstants: { userStatus, userRoles, departments, designations } } } } = require("../../utils");

const { userManagementConfigs: { authConfigs: { PASSWORD_EXPIRY_AT, PASSWORD_ATTEMPTS, OTP_ATTEMPTS, OTP_EXPIRY_AT } } } = require("../../configs");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true },
        passwordExpiresAt: { type: Date, default: PASSWORD_EXPIRY_AT },
        passwordAttempts: { type: Number, default: PASSWORD_ATTEMPTS },
        isBlocked: { type: Boolean, default: false },
        refreshToken: { type: String },
        refreshTokenExpiresAt: { type: Date },
        otp: { type: String },
        otpExpiresAt: { type: Date, default: OTP_EXPIRY_AT },
        otpAttempts: { type: Number, default: OTP_ATTEMPTS },
        isVerified: { type: Boolean, default: false },
        verificationDate: { type: Date },
    },
    contactNumber: {
        primaryPhoneNumber: { type: String, },
        primaryCountryCode: { type: String, enum: Object.keys(countryCodesObject) }, // Added country code
    },

    // role: { type: String, enum: Object.keys(userRoles), required: true },
    // status: { type: String, enum: Object.keys(userStatus), required: true },
    // department: { type: String, enum: Object.keys(departments) },
    // designation: {
    //     type: String,
    //     validate: {
    //         validator: function (value) {
    //             if (designations[this.department] && designations[this.department][value]) {
    //                 return true;
    //             }
    //             return false;
    //         },
    //         message: props => `${props.value} is not a valid designation for the selected department`
    //     }
    // },
    organizations: [{
        id: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Organization",
            required: true // Optional: enforce that an organization must be provided
        },
        noOfIntractions: { type: Number, default: 0 },
        subscriptionType: {
            type: String,
            enum: ["Free", "Paid"],
            default: "Free" // Optional: set a default value
        }
    }],
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    },
    updatedBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
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


// userSchema.statics = {
//     userRoles: userRoles,
//     contactMethods: contactMethods
// }

const Users = mongoose.model("User", userSchema, "users");
module.exports = { Users };