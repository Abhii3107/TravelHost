const joi = require("joi"); // it validate schema

module.exports.listingSchema = joi.object({
    listing : joi.object({                         // listing.required - means listing to hona hi chayie aur uske ke andr kya required hona chayie
        title : joi.string().required(),
        description: joi.string().required(),
        location :joi.string().required(),
        country : joi.string().required(),
        price : joi.number().required().min(0),
        image : joi.string().required(),
    }).required()
});