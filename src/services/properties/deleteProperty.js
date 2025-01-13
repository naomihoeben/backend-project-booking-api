import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteProperty = async (id) => {
	try {
		const propertyExists = await prisma.property.findUnique({ where: { id } });
		if (!propertyExists) return null;

		await prisma.propertyAmenity.deleteMany({ where: { propertyId: id } });
		await prisma.review.deleteMany({ where: { propertyId: id } });
		await prisma.booking.deleteMany({ where: { propertyId: id } });
		return await prisma.property.delete({ where: { id } });
	} catch (error) {
		console.error(`Error deleting property with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete property. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteProperty;
