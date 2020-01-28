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
// ======== Database ====== //
// ======================== //

if (process.env.NODE_ENV === 'dev'){
	urlDB = 'mongodb://localhost:27017/cafe';
}else{
	urlDB = 'mongodb+srv://cafe-db:PJMoI0IToIzUeEzA@cluster0-rhxow.mongodb.net/cafe?retryWrites=true&w=majority'
}

process.env.URLDB = urlDB;