import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createProperty = async (propertyData) => {
	const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId } =
		propertyData;

	if (
		!title ||
		!description ||
		!location ||
		!pricePerNight ||
		!bedroomCount ||
		!bathRoomCount ||
		!maxGuestCount ||
		!rating ||
		!hostId
	) {
		const error = new Error("All required fields must be provided.");
		error.status = 400;
		throw error;
	}

	try {
		const newProperty = await prisma.property.create({
			data: { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, rating, hostId },
		});

		console.log("[Service] createProperty - Property created successfully:", newProperty.id);
		return { status: 201, data: newProperty };
	} catch (error) {
		console.error("[Service] createProperty - Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createProperty;
