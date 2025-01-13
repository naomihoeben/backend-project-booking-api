import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getPropertyById = async (id) => {
	try {
		return await prisma.property.findUnique({
			where: { id },
		});
	} catch (error) {
		console.error(`Error retrieving property with ID ${id}: ${error.message}`);
		throw new Error(`Failed to retrieve property. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getPropertyById;
