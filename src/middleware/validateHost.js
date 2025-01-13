const validateHost = (req, res, next) => {
	try {
		const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;

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

		const errors = [
			validateField(username, "Username"),
			validateField(password, "Password"),
			validateField(name, "Name"),
			validateField(email, "Email"),
			validateField(phoneNumber, "Phone Number"),
			validateField(profilePicture, "Profile Picture"),
			validateField(aboutMe, "About Me"),
			validateEmail(email),
		].filter(Boolean);

		if (errors.length > 0) {
			console.error(`[validateHost] Validation error: ${errors.join("; ")}`);
			return res.status(400).json({
				error: { code: 400, message: errors.join("; ") },
			});
		}

		next();
	} catch (error) {
		console.error(`[validateHost] Internal server error: ${error.message}`);
		return res.status(500).json({
			error: { code: 500, message: "Internal server error." },
		});
	}
};

export default validateHost;
