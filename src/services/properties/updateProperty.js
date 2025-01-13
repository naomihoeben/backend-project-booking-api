import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateProperty = async (id, data) => {
	try {
		const propertyExists = await prisma.property.findUnique({ where: { id } });
		if (!propertyExists) {
			console.error(`[Service] updateProperty - Property with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (data.title) updatedData.title = data.title;
		if (data.description) updatedData.description = data.description;
		if (data.location) updatedData.location = data.location;
		if (data.pricePerNight) updatedData.pricePerNight = data.pricePerNight;
		if (data.bedroomCount) updatedData.bedroomCount = data.bedroomCount;
		if (data.bathRoomCount) updatedData.bathRoomCount = data.bathRoomCount;
		if (data.maxGuestCount) updatedData.maxGuestCount = data.maxGuestCount;

		const updatedProperty = await prisma.property.update({
			where: { id },
			data: updatedData,
		});

		console.log(`[Service] updateProperty - Property ${id} updated successfully.`);
		return updatedProperty;
	} catch (error) {
		console.error(`[Service] updateProperty - Error updating property with ID ${id}: ${error.message}`);
		throw new Error(`Failed to update property. ${error.message}`);
	}
};

export default updateProperty;
