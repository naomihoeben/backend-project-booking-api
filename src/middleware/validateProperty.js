const validateProperty = (req, res, next) => {
	try {
		const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount } = req.body;

		const validateField = (field, fieldName, type = "string") => {
			if (field !== undefined) {
				if (type === "string" && (typeof field !== "string" || field.trim().length === 0)) {
					return `${fieldName} must be a non-empty string.`;
				}
				if (type === "number" && (typeof field !== "number" || field < 0)) {
					return `${fieldName} must be a non-negative number.`;
				}
			}
			return null;
		};

		const errors = [
			validateField(title, "Title"),
			validateField(description, "Description"),
			validateField(location, "Location"),
			validateField(pricePerNight, "Price per Night", "number"),
			validateField(bedroomCount, "Bedroom Count", "number"),
			validateField(bathRoomCount, "Bathroom Count", "number"),
			validateField(maxGuestCount, "Max Guest Count", "number"),
		].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateProperty] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateProperty] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateProperty;
