/*
 * Config file
 */

// ======================== //
// ========= Port ========= //
// ======================== //
process.env.PORT = process.env.PORT || 3000;

// ======================== //
// ====== Environment ===== //
// ======================== //
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ======================== //
// ==== Token expiration == //
// ======================== //
// 60 seconds
// 60 minutes
// 24 hours
// 30 days
process.env.TOKEN_EXPIRATION = 60 * 60 * 24 * 30;

// ======================== //
// ======+ Token Seed ===== //
// ======================== //
process.env.TOKEN_SEED = process.env.TOKEN_SEED || 'secret-seed-dev';

// ======================== //
// ======+ Token Seed ===== //
// ======================== //
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '286099481693-uq7de8osuqlchc5a375omk6pgaqh9dtg.apps.googleusercontent.com';

// ======================== //
// ======== Database ====== //
// ======================== //

if (process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}else{
	urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;