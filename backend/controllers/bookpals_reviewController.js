const reviewModel = require("../models/bookpals_reviewModel");
const asyncHandler = require("express-async-handler");

// Create a new review
const createReview = asyncHandler(async (req, res) => {
	const {
		userId,
		username,
		bookName,
		authorName,
		rating,
		description,
		bookCover,
	} = req.body;

	const response = await reviewModel.create({
		userId,
		username,
		bookName,
		authorName,
		rating,
		description,
		bookCover,
	});

	if (response) {
		res.status(201).json({
			id: response._id,
		});
	} else {
		res.status(403).json("Review could not be created!");
	}
});

// Read all reviews
const getReviews = asyncHandler(async (req, res) => {
	const response = await reviewModel.find();
	if (response) {
		res.status(200).json(response);
	} else {
		res.status(401).json("Reviews could not be fetched");
	}
});

// Get a review by ID
const getReviewById = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const response = await reviewModel.findById(id);
	if (response) {
		res.status(200).json(response);
	} else {
		res.status(404).json("Review not found");
	}
});

// Update a review by ID
const updateReview = asyncHandler(async (req, res) => {
	const id = req.params.id;

	// Check if the review exists for the update process
	const checkInstance = await reviewModel.findById(id);

	if (checkInstance) {
		const response = await reviewModel.findByIdAndUpdate(id, {
			...req.body,
		});
		if (response) {
			res.status(200).json(response);
		} else {
			res.status(403).json("Review could not be updated");
		}
	} else {
		res.status(404).json("Review does not exist in the database");
	}
});

// Delete a review by ID
const deleteReview = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const response = await reviewModel.findByIdAndDelete(id);
	if (response) {
		res.status(202).json(response);
	} else {
		res.status(400).json({ error: "Review not deleted" });
	}
});


// Fetch reviews by the currently logged-in user
const getReviewsByCurrentUser = asyncHandler(async (req, res) => {
	const userId = req.params.userId; // Get the user ID from URL parameters

	const response = await reviewModel.find({ userId: userId });
	if (response) {
		res.status(200).json(response);
	} else {
		res.status(401).json("Reviews could not be fetched");
	}
});

// Upvote a review by ID
const upvoteReview = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const newVoteCount = req.body.newVoteCount;

	// Find the review by ID
	const review = await reviewModel.findById(id);

	if (!review) {
		return res.status(404).json("Review not found");
	}

	// Update the votes field with the new vote count
	review.votes = newVoteCount;

	// Save the updated review
	await review.save();

	res.status(200).json({ votes: newVoteCount });
});

// Downvote a review by ID
const downvoteReview = asyncHandler(async (req, res) => {
	const id = req.params.id;
	const newVoteCount = req.body.newVoteCount;

	// Find the review by ID
	const review = await reviewModel.findById(id);

	if (!review) {
		return res.status(404).json("Review not found");
	}

	// Update the votes field with the new vote count
	review.votes = newVoteCount;

	// Save the updated review
	await review.save();

	res.status(200).json({ votes: newVoteCount });
});

module.exports = {
	createReview,
	getReviews,
	getReviewById,
	updateReview,
	deleteReview,
	getReviewsByCurrentUser,
	upvoteReview,
	downvoteReview,
};
