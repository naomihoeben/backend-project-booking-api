import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenityById = async (id) => {
	try {
		return await prisma.amenity.findUnique({
			where: { id },
		});
	} catch (error) {
		console.error(`Error retrieving amenity with ID ${id}: ${error.message}`);
		throw new Error(`Failed to retrieve amenity. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getAmenityById;
