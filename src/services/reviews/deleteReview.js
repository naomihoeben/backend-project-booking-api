import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteReview = async (id) => {
	try {
		const reviewExists = await prisma.review.findUnique({ where: { id } });
		if (!reviewExists) return null;

		return await prisma.review.delete({ where: { id } });
	} catch (error) {
		console.error(`Error deleting review with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete review. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteReview;
