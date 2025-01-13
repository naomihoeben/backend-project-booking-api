import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createBooking = async (bookingData) => {
	const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = bookingData;

	if (!userId || !propertyId || !checkinDate || !checkoutDate || !numberOfGuests || !totalPrice || !bookingStatus) {
		const error = new Error("All required fields must be provided.");
		error.status = 400;
		throw error;
	}

	try {
		const newBooking = await prisma.booking.create({
			data: {
				userId,
				propertyId,
				checkinDate: new Date(checkinDate),
				checkoutDate: new Date(checkoutDate),
				numberOfGuests,
				totalPrice,
				bookingStatus,
			},
		});

		console.log("[Service] createBooking - Booking created successfully:", newBooking.id);
		return { status: 201, data: newBooking };
	} catch (error) {
		console.error("[Service] createBooking - Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createBooking;
