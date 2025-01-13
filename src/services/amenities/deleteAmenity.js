import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteAmenity = async (id) => {
	try {
		const amenityExists = await prisma.amenity.findUnique({ where: { id } });
		if (!amenityExists) return null;

		await prisma.propertyAmenity.deleteMany({ where: { amenityId: id } });
		return await prisma.amenity.delete({ where: { id } });
	} catch (error) {
		console.error(`Error deleting amenity with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete amenity. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteAmenity;
