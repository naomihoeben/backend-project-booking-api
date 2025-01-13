import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookings = async (userId) => {
	try {
		const filter = userId ? { userId } : {};

		const bookings = await prisma.booking.findMany({
			where: filter,
			include: {
				user: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				property: {
					select: {
						id: true,
						title: true,
						location: true,
					},
				},
			},
		});

		if (!bookings || bookings.length === 0) {
			console.error(`[Service] getBookings - No bookings found.`);
			return { status: 404, message: "No bookings found." };
		}

		console.log(`[Service] getBookings - Retrieved ${bookings.length} bookings.`);
		return bookings;
	} catch (error) {
		console.error(`[Service] getBookings - Error: ${error.message}`);
		return { status: 500, message: `Failed to retrieve bookings. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getBookings;
