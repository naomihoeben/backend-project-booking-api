import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHostById = async (id) => {
	try {
		return await prisma.host.findUnique({
			where: { id },
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
				phoneNumber: true,
				profilePicture: true,
				aboutMe: true,
			},
		});
	} catch (error) {
		console.error(`Error retrieving host with ID ${id}: ${error.message}`);
		throw new Error(`Failed to retrieve host. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default getHostById;
