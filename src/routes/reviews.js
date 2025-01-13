import express from "express";
import getReviews from "../services/reviews/getReviews.js";
import getReviewById from "../services/reviews/getReviewById.js";
import createReview from "../services/reviews/createReview.js";
import updateReview from "../services/reviews/updateReview.js";
import deleteReview from "../services/reviews/deleteReview.js";
import authenticate from "../middleware/authenticate.js";
import validateReview from "../middleware/validateReview.js";

const reviewsRouter = express.Router();

// GET /reviews
reviewsRouter.get("/", async (req, res, next) => {
	try {
		const reviews = await getReviews();
		console.log(`[GET] /reviews - Retrieved ${reviews.length} reviews`);
		res.status(200).json(reviews);
	} catch (error) {
		console.error(`[GET] /reviews - Error: ${error.message}`);
		next(error);
	}
});

// GET /reviews/:id
reviewsRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching review with ID: ${id}`);

		const review = await getReviewById(id);

		if (!review) {
			console.warn(`Review with ID ${id} not found`);
			return res.status(404).json({ message: `Review with ID ${id} not found` });
		}

		res.status(200).json(review);
	} catch (error) {
		console.error(`Error in GET /reviews/${id}: ${error.message}`);
		res.status(500).json({ message: "An error occurred while fetching the review." });
	}
});

// POST /reviews
reviewsRouter.post("/", authenticate, validateReview, async (req, res, next) => {
	try {
		const newReview = await createReview(req.body);
		console.log(`[POST] /reviews - Created new review: ${newReview.id}`);
		res.status(201).json(newReview);
	} catch (error) {
		console.error(`[POST] /reviews - Error: ${error.message}`);
		next(error);
	}
});

// PUT /reviews/:id
reviewsRouter.put("/:id", authenticate, validateReview, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedReview = await updateReview(id, req.body);

		if (!updatedReview) {
			console.warn(`[PUT] /reviews/${id} - Review not found`);
			return res.status(404).json({ message: `Review with id ${id} not found` });
		}

		console.log(`[PUT] /reviews/${id} - Review updated`);
		res.status(200).json(updatedReview);
	} catch (error) {
		console.error(`[PUT] /reviews/${id} - Error: ${error.message}`);
		next(error);
	}
});

// DELETE /reviews/:id
reviewsRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting review with ID: ${id}`);

		const deletedReview = await deleteReview(id);
		if (!deletedReview) return res.status(404).json({ message: `Review with ID ${id} not found` });

		res.status(200).json({ message: `Review with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /reviews/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the review." });
	}
});

export default reviewsRouter;
