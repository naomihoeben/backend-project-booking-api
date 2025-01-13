import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAmenities = async () => {
	try {
		const amenities = await prisma.amenity.findMany();

		if (!amenities || amenities.length === 0) {
			console.error(`[Service] getAmenities - No amenities found.`);
			return { status: 404, message: "No amenities found." };
		}

		console.log(`[Service] getAmenities - Retrieved ${amenities.length} amenities.`);
		return amenities;
	} catch (error) {
		console.error(`[Service] getAmenities - Error: ${error.message}`);
		return { status: 500, message: `Failed to retrieve amenities. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getAmenities;
