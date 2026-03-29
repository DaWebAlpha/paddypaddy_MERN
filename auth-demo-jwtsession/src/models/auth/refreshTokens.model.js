import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true, 
    },
    tokenVersion: {
        type: Number,
        default: 0,
        min: 0,
        
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        default: () => new Date(Date.now() + 15 * 60 * 1000) // 15 days
    },
    userAgent: {
        type: String,
        trim: true,
    },
    ipAddress: {
        type: String,
        trim: true,
    },
    deviceName: {
        type: String,
        trim: true,
    },
    deviceId: {
        type: String,
        trim: true,
        required: true,
        
    },
    lastUsedAt: {
        type: Date,
        default: () => new Date(), // CRITICAL FIX: Added arrow function
        // Removed standalone index: handled by the new compound index below
    },
    revokedAt: {
        type: Date,
        default: null,
    },
    revokeReason: {
        type: String,
        trim: true,
        maxlength: 200,
        default: null,
    },
    isRevoked: {
        type: Boolean,
        default: false,
        
    }
}, { timestamps: true });



// 1. Fetch a specific user's active RefreshTokens, sorted by expiry (e.g., background cleanup)
RefreshTokenSchema.index({ userId: 1, isRevoked: 1, expiresAt: 1 });

// 2. NEW: Fetch a user's active RefreshTokens, sorted by most recently used (e.g., "Active Devices" UI)
RefreshTokenSchema.index({ userId: 1, isRevoked: 1, lastUsedAt: -1 });

// 3. Check if a user has an active RefreshToken on a specific device (e.g., "Log out of other devices")
RefreshTokenSchema.index({ userId: 1, deviceId: 1, isRevoked: 1 });

// 4. TTL Index: Auto-delete expired RefreshTokens (0 means delete exactly at expiresAt)
RefreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });


// Pre-validate hook to clean up empty strings
RefreshTokenSchema.pre('validate', function() {
    if (this.userAgent === '') this.userAgent = null;
    if (this.ipAddress === '') this.ipAddress = null;
    if (this.deviceName === '') this.deviceName = null;
    if (this.revokeReason === '') this.revokeReason = null;
});

// Instance Methods
RefreshTokenSchema.methods.revoke = async function (reason = 'manual_revocation') {
    this.isRevoked = true;
    this.revokedAt = new Date();
    this.revokeReason = reason;
    return this.save({ validateBeforeSave: false });
};

RefreshTokenSchema.methods.isActive = function () {
    return (
        !this.isRevoked &&
        this.expiresAt &&
        this.expiresAt.getTime() > Date.now()
    );
};

// Add this to RefreshTokenSchema.statics in your model file
RefreshTokenSchema.statics.touch = async function(token) {
    return this.findOneAndUpdate(
        { token, isRevoked: false }, 
        { lastUsedAt: new Date() },
        { new: true }
    );
};

const RefreshToken = mongoose.model("RefreshToken", RefreshTokenSchema);

export { RefreshToken };
export default RefreshToken;