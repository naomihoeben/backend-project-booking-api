const validateReview = (req, res, next) => {
	try {
		const { userId, propertyId, rating, comment } = req.body;

		const validateField = (field, fieldName, type = "string") => {
			if (field !== undefined) {
				if (type === "string" && (typeof field !== "string" || field.trim().length === 0)) {
					return `${fieldName} must be a non-empty ${type}.`;
				}
				if (type === "number" && (typeof field !== "number" || field < 1 || field > 5)) {
					return `${fieldName} must be a number between 1 and 5.`;
				}
			}
			return null;
		};

		const errors = [
			validateField(userId, "User ID"),
			validateField(propertyId, "Property ID"),
			validateField(rating, "Rating", "number"),
			validateField(comment, "Comment"),
		].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateReview] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateReview] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateReview;
