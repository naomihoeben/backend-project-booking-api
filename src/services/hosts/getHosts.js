import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getHosts = async (filters) => {
	try {
		const { name } = filters || {};

		const hosts = await prisma.host.findMany({
			where: {
				...(name && { name: { contains: name, mode: "insensitive" } }),
			},
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

		if (!hosts || hosts.length === 0) {
			console.error(`[Service] getHosts - No hosts found.`);
			return { status: 404, message: "No hosts found." };
		}

		console.log(`[Service] getHosts - Retrieved ${hosts.length} hosts.`);
		return hosts;
	} catch (error) {
		console.error(`[Service] getHosts - Error: ${error.message}`);
		return { status: 500, message: `Failed to retrieve hosts. ${error.message}` };
	} finally {
		await prisma.$disconnect();
	}
};

export default getHosts;
