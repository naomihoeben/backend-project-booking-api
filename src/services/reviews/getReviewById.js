import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getReviewById = async (id) => {
	try {
		return await prisma.review.findUnique({
			where: { id },
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
	} catch (error) {
		console.error(`Error retrieving review with ID ${id}: ${error.message}`);
		throw new Error(`Failed to retrieve review. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getReviewById;
