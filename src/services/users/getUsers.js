import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (filters) => {
	try {
		const { username, email } = filters || {};

		const users = await prisma.user.findMany({
			where: {
				...(username && { username: { contains: username, mode: "insensitive" } }),
				...(email && { email: { contains: email, mode: "insensitive" } }),
			},
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
				phoneNumber: true,
				profilePicture: true,
			},
		});

		if (!users || users.length === 0) {
			console.error(`[Service] getUsers - No users found with filters:`, filters);
			return { status: 404, message: "No users found." };
		}

		console.log(`[Service] getUsers - Retrieved ${users.length} users.`);
		return users;
	} catch (error) {
		console.error(`[Service] getUsers - Error: ${error.message}`);
		return { status: 500, message: `Failed to fetch users. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getUsers;
