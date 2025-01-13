import * as Sentry from "@sentry/node";

const errorHandler = (err, req, res, next) => {
	Sentry.captureException(err);

	console.error(`[${new Date().toLocaleString()}] Error:`, err.message);

	const statusCode = err.status || 500;
	res.status(statusCode).json({
		error: "An error occurred on the server, please double-check your request!",
	});
};

export default errorHandler;
