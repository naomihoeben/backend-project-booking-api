import express from "express";
import getBookings from "../services/bookings/getBookings.js";
import getBookingById from "../services/bookings/getBookingById.js";
import createBooking from "../services/bookings/createBooking.js";
import updateBooking from "../services/bookings/updateBooking.js";
import deleteBooking from "../services/bookings/deleteBooking.js";
import authenticate from "../middleware/authenticate.js";
import validateBooking from "../middleware/validateBooking.js";

const bookingsRouter = express.Router();

// GET /bookings
bookingsRouter.get("/", async (req, res, next) => {
	try {
		const { userId } = req.query;
		const bookings = await getBookings(userId);
		console.log(`[GET] /bookings - Retrieved ${bookings.length} bookings`);
		res.status(200).json(bookings);
	} catch (error) {
		console.error(`[GET] /bookings - Error: ${error.message}`);
		next(error);
	}
});

// GET /bookings/:id
bookingsRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching booking with ID: ${id}`);

		const booking = await getBookingById(id);

		if (!booking) {
			console.warn(`Booking with ID ${id} not found`);
			return res.status(404).json({ message: `Booking with ID ${id} not found` });
		}

		res.status(200).json(booking);
	} catch (error) {
		console.error(`Error in GET /bookings/${id}: ${error.message}`);
		res.status(500).json({ message: "An error occurred while fetching the booking." });
	}
});

// POST /bookings
bookingsRouter.post("/", authenticate, validateBooking, async (req, res, next) => {
	try {
		const newBooking = await createBooking(req.body);
		console.log(`[POST] /bookings - Created new booking: ${newBooking.id}`);
		res.status(201).json(newBooking);
	} catch (error) {
		console.error(`[POST] /bookings - Error: ${error.message}`);
		next(error);
	}
});

// PUT /bookings/:id
bookingsRouter.put("/:id", authenticate, validateBooking, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedBooking = await updateBooking(id, req.body);

		if (!updatedBooking) {
			console.warn(`[PUT] /bookings/${id} - Booking not found`);
			return res.status(404).json({ message: `Booking with id ${id} not found` });
		}

		console.log(`[PUT] /bookings/${id} - Booking updated`);
		res.status(200).json(updatedBooking);
	} catch (error) {
		console.error(`[PUT] /bookings/${id} - Error: ${error.message}`);
		next(error);
	}
});

// DELETE /bookings/:id
bookingsRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting booking with ID: ${id}`);

		const deletedBooking = await deleteBooking(id);
		if (!deletedBooking) return res.status(404).json({ message: `Booking with ID ${id} not found` });

		res.status(200).json({ message: `Booking with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /bookings/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the booking." });
	}
});

export default bookingsRouter;
