import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateBooking = async (id, data) => {
	try {
		const bookingExists = await prisma.booking.findUnique({ where: { id } });

		if (!bookingExists) {
			console.error(`[Service] updateBooking - Booking with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (data.userId) updatedData.userId = data.userId;
		if (data.propertyId) updatedData.propertyId = data.propertyId;
		if (data.checkinDate) updatedData.checkinDate = data.checkinDate;
		if (data.checkoutDate) updatedData.checkoutDate = data.checkoutDate;
		if (data.numberOfGuests) updatedData.numberOfGuests = data.numberOfGuests;

		const updatedBooking = await prisma.booking.update({
			where: { id },
			data: updatedData,
		});

		console.log(`[Service] updateBooking - Booking ${id} updated successfully.`);
		return updatedBooking;
	} catch (error) {
		console.error(`[Service] updateBooking - Error: ${error.message}`);
		throw new Error(`Failed to update booking. ${error.message}`);
	}
};

export default updateBooking;
