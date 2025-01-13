import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteBooking = async (id) => {
	try {
		const bookingExists = await prisma.booking.findUnique({ where: { id } });
		if (!bookingExists) return null;

		return await prisma.booking.delete({ where: { id } });
	} catch (error) {
		console.error(`Error deleting booking with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete booking. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteBooking;
