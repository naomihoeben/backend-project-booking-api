import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBookingById = async (id) => {
	try {
		return await prisma.booking.findUnique({
			where: { id },
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
	} catch (error) {
		console.error(`Error retrieving booking with ID ${id}: ${error.message}`);
		throw new Error(`Failed to retrieve booking. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getBookingById;
