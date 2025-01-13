import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateReview = async (id, data) => {
	try {
		const reviewExists = await prisma.review.findUnique({ where: { id } });

		if (!reviewExists) {
			console.error(`[Service] updateReview - Review with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (data.userId) updatedData.userId = data.userId;
		if (data.propertyId) updatedData.propertyId = data.propertyId;
		if (data.rating) updatedData.rating = data.rating;
		if (data.comment) updatedData.comment = data.comment;

		const updatedReview = await prisma.review.update({
			where: { id },
			data: updatedData,
		});

		console.log(`[Service] updateReview - Review ${id} updated successfully.`);
		return updatedReview;
	} catch (error) {
		console.error(`[Service] updateReview - Error updating review with ID ${id}: ${error.message}`);
		throw new Error(`Failed to update review. ${error.message}`);
	}
};

export default updateReview;
