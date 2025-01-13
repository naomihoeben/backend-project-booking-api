import express from "express";
import * as Sentry from "@sentry/node";

import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import amenitiesRouter from "./routes/amenities.js";
import bookingsRouter from "./routes/bookings.js";
import reviewsRouter from "./routes/reviews.js";

import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Sentry configureren
Sentry.init({
	dsn: process.env.SENTRY_DSN,
	tracesSampleRate: 1.0,
});

// Middleware
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/", authRouter);
app.use("/users", usersRouter);
app.use("/hosts", hostsRouter);
app.use("/properties", propertiesRouter);
app.use("/amenities", amenitiesRouter);
app.use("/bookings", bookingsRouter);
app.use("/reviews", reviewsRouter);

// Sentry Error Handler
app.use(Sentry.Handlers.errorHandler());

// Centrale error handler
app.use(errorHandler);

// Server starten
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`Server is listening on http://localhost:${PORT}`);
});
