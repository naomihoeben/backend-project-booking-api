const validateLogin = (req, res, next) => {
	try {
		const { username, password } = req.body;

		const validateField = (field, fieldName) => {
			if (!field || typeof field !== "string" || field.trim().length === 0) {
				return `${fieldName} is required and must be a non-empty string.`;
			}
			return null;
		};

		const errors = [validateField(username, "Username"), validateField(password, "Password")].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateLogin] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateLogin] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateLogin;
