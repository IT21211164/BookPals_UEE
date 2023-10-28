const express = require("express");
const router = express.Router();
const {
	createReview,
	getReviews,
	getReviewById,
	updateReview,
	deleteReview,
	getReviewsByCurrentUser,
	upvoteReview,
	downvoteReview,
} = require("../controllers/bookpals_reviewController");

// Routes for reviews
router.post("/create", createReview);
router.get("/read", getReviews);
router.get("/display/:id", getReviewById);
router.put("/update/:id", updateReview);
router.delete("/delete/:id", deleteReview);
router.get("/myreviews/:userId", getReviewsByCurrentUser);
router.put("/upvote/:id", upvoteReview);
router.put("/downvote/:id", downvoteReview);

module.exports = router;
