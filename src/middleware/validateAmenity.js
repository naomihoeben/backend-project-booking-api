const validateAmenity = (req, res, next) => {
	try {
		const { name } = req.body;

		const validateField = (field, fieldName) => {
			if (field !== undefined) {
				if (typeof field !== "string" || field.trim().length === 0) {
					return `${fieldName} must be a non-empty string.`;
				}
			}
			return null;
		};

		const errors = [validateField(name, "Name")].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateAmenity] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateAmenity] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateAmenity;
