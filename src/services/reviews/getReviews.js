import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviews = async () => {
	try {
		const reviews = await prisma.review.findMany({
			include: {
				user: {
					select: {
						id: true,
						name: true,
					},
				},
				property: {
					select: {
						id: true,
						title: true,
					},
				},
			},
		});

		if (!reviews || reviews.length === 0) {
			console.error(`[Service] getReviews - No reviews found.`);
			return { status: 404, message: "No reviews found." };
		}

		console.log(`[Service] getReviews - Retrieved ${reviews.length} reviews.`);
		return reviews;
	} catch (error) {
		console.error(`[Service] getReviews - Error: ${error.message}`);
		return { status: 500, message: `Failed to fetch reviews. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getReviews;
