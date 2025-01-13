import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Authorization header missing" });
	}

	// Voeg automatisch 'Bearer' toe als het ontbreekt
	const token = authHeader.startsWith("Bearer ") ? authHeader : `Bearer ${authHeader}`;

	// Verwerk de token na het splitsen
	const finalToken = token.split(" ")[1];

	try {
		const decoded = jwt.verify(finalToken, process.env.AUTH_SECRET_KEY);
		console.log("Decoded token:", decoded);
		req.user = decoded;
		next();
	} catch (error) {
		console.error("Token verification error:", error.message);
		return res.status(401).json({ message: "Invalid or expired token" });
	}
};

export default authenticate;
