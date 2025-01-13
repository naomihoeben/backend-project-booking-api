import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteHost = async (id) => {
	try {
		const hostExists = await prisma.host.findUnique({ where: { id } });
		if (!hostExists) return null;

		const properties = await prisma.property.findMany({ where: { hostId: id } });

		await prisma.$transaction([
			prisma.propertyAmenity.deleteMany({
				where: {
					propertyId: { in: properties.map((property) => property.id) },
				},
			}),
			prisma.booking.deleteMany({ where: { property: { hostId: id } } }),
			prisma.property.deleteMany({ where: { hostId: id } }),
			prisma.host.delete({ where: { id } }),
		]);

		return { id };
	} catch (error) {
		console.error(`Error deleting host with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete host. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteHost;
