import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateAmenity = async (id, amenityData) => {
	try {
		const amenityExists = await prisma.amenity.findUnique({ where: { id } });

		if (!amenityExists) {
			console.error(`[Service] updateAmenity - Amenity with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (amenityData.name) updatedData.name = amenityData.name;

		const updatedAmenity = await prisma.amenity.update({
			where: { id },
			data: updatedData,
		});

		console.log(`[Service] updateAmenity - Amenity ${id} updated successfully.`);
		return updatedAmenity;
	} catch (error) {
		console.error(`[Service] updateAmenity - Error: ${error.message}`);
		throw new Error(`Failed to update amenity. ${error.message}`);
	}
};

export default updateAmenity;
