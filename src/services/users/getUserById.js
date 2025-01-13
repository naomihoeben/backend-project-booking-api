import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUserById = async (id) => {
	try {
		return await prisma.user.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
				phoneNumber: true,
				profilePicture: true,
			},
		});
	} catch (error) {
		console.error(`Error fetching user with ID ${id}: ${error.message}`);
		throw new Error(`Failed to fetch user. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getUserById;
