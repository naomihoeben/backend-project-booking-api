import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filters) => {
	try {
		const { location, pricePerNight, amenities } = filters || {};
		const whereClause = {};

		if (location) {
			whereClause.location = {
				contains: location,
				mode: "insensitive",
			};
		}

		if (pricePerNight) {
			whereClause.pricePerNight = Number(pricePerNight);
		}

		if (amenities) {
			whereClause.amenities = {
				some: {
					amenity: {
						name: { equals: amenities },
					},
				},
			};
		}

		const properties = await prisma.property.findMany({
			where: whereClause,
			include: {
				host: { select: { id: true, name: true } },
				amenities: {
					select: {
						amenity: { select: { id: true, name: true } },
					},
				},
			},
		});

		if (!properties || properties.length === 0) {
			return { status: 404, message: "No properties found." };
		}

		return properties;
	} catch (error) {
		console.error(`[Service] getProperties - Error: ${error.message}`);
		return { status: 500, message: `Failed to fetch properties. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getProperties;
