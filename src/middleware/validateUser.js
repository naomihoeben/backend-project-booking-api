const validateUser = (req, res, next) => {
	try {
		const { username, email, password } = req.body;

		const validateField = (field, fieldName) => {
			if (field !== undefined) {
				if (typeof field !== "string" || field.trim().length === 0) {
					return `${fieldName} must be a non-empty string.`;
				}
			}
			return null;
		};

		const validateEmail = (email) => {
			if (email !== undefined) {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return emailRegex.test(email) ? null : "Email must be a valid email address.";
			}
			return null;
		};

		const validatePassword = (password) => {
			if (password !== undefined && password.length < 8) {
				return "Password must be at least 8 characters long.";
			}
			return null;
		};

		const errors = [
			validateField(username, "Username"),
			validateField(email, "Email"),
			validateField(password, "Password"),
			validateEmail(email),
			validatePassword(password),
		].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateUser] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateUser] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateUser;
