const Joi = require("joi"); // it validate schema

module.exports.listingSchema = Joi.object({
    listing : Joi.object({                         // listing.required - means listing to hona hi chayie aur uske ke andr kya required hona chayie
        title : Joi.string().required(),
        description: Joi.string().required(),
        location :Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("", null),

        type: Joi.string()
      .valid("beach", "mountain", "arctic", "desert", "forest", "city", "island", "trending")
      .required(),


    }).required()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    }).required()
})  