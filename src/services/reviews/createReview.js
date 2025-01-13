import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createReview = async (reviewData) => {
	const { userId, propertyId, rating, comment } = reviewData;

	if (!userId || !propertyId || !rating || !comment) {
		const error = new Error("All required fields must be provided.");
		error.status = 400;
		throw error;
	}

	try {
		const newReview = await prisma.review.create({
			data: { userId, propertyId, rating, comment },
		});

		console.log("[Service] createReview - Review created successfully:", newReview.id);
		return { status: 201, data: newReview };
	} catch (error) {
		console.error("[Service] createReview - Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createReview;
