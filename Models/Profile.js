const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    title: String,
    value: String
});


const profileSchema = new mongoose.Schema({
    name: { type: String, required: true },
    about: { type: String, required: true },
   // company: { type: String, required: true },
    // website: { type: String },


    
    phone: { type: String },   // ✅ added
    email: { type: String },   // ✅ added


     contacts: [contactSchema],

    socialLinks: [
        {
            title: String,
            url: String
        }
    ],

    location: { type: String },

    image: { type: String },
    createdAt: { type: Date, default: Date.now }

    
});



module.exports = mongoose.model('Profile', profileSchema);
