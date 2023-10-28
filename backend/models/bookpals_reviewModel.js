const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	bookName: {
		type: String,
		required: true,
	},
	authorName: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
	votes: {
		type: Number,
		default: 0,
	},
	description: {
		type: String,
		required: true,
	},
	bookCover: {
		type: String,
	},
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
