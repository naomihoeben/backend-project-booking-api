import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const getProperties = async (filters) => {
	try {
		const { location, pricePerNight, amenities } = filters || {};
		const whereClause = {};

		if (location) {
			whereClause.location = {
				contains: location,
			};
		}

		if (pricePerNight) {
			if (isNaN(pricePerNight)) {
				throw new Error("Invalid value for pricePerNight. Must be a number.");
			}
			whereClause.pricePerNight = Number(pricePerNight); // Convert to number
		}

		if (amenities) {
			const amenitiesList = amenities.split(",").map((a) => a.trim());
			whereClause.amenities = {
				some: {
					amenity: {
						name: { in: amenitiesList },
					},
				},
			};
		}

		console.log("Filters applied:", whereClause);

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
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(`[Service] Prisma error: ${error.message}`);
			return { status: 400, message: `Database query error: ${error.message}` };
		}
		console.error(`[Service] getProperties - Error: ${error.message}`);
		return { status: 500, message: `Failed to fetch properties. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getProperties;
