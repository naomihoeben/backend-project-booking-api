import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createAmenity = async (amenityData) => {
	const { name } = amenityData;

	if (!name) {
		const error = new Error("The 'name' field is required.");
		error.status = 400;
		throw error;
	}

	try {
		const newAmenity = await prisma.amenity.create({
			data: { name },
		});

		console.log("[Service] createAmenity - Amenity created successfully:", newAmenity.id);
		return { status: 201, data: newAmenity };
	} catch (error) {
		console.error("[Service] createAmenity - Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createAmenity;
