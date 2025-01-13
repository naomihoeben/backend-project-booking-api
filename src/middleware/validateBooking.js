const validateBooking = (req, res, next) => {
	try {
		const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests } = req.body;

		const validateField = (field, fieldName, type = "string") => {
			if (field !== undefined) {
				if (type === "string" && typeof field !== "string") {
					return `${fieldName} must be a string.`;
				}
				if (type === "number" && (typeof field !== "number" || field <= 0)) {
					return `${fieldName} must be a positive number.`;
				}
			}
			return null;
		};

		const errors = [
			validateField(userId, "userId"),
			validateField(propertyId, "propertyId"),
			validateField(checkinDate, "checkinDate"),
			validateField(checkoutDate, "checkoutDate"),
			validateField(numberOfGuests, "numberOfGuests", "number"),
		].filter(Boolean);

		if (checkinDate !== undefined && checkoutDate !== undefined) {
			const checkin = new Date(checkinDate);
			const checkout = new Date(checkoutDate);
			if (isNaN(checkin.getTime()) || isNaN(checkout.getTime())) {
				errors.push("Invalid date format for checkinDate or checkoutDate.");
			} else if (checkin >= checkout) {
				errors.push("checkinDate must be earlier than checkoutDate.");
			}
		}

		if (errors.length > 0) {
			console.error(`[validateBooking] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateBooking] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateBooking;
