import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createHost = async (hostData) => {
	const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = hostData;

	if (!username || !password || !name || !email || !phoneNumber || !profilePicture || !aboutMe) {
		const error = new Error("All required fields must be provided.");
		error.status = 400;
		throw error;
	}

	try {
		const newHost = await prisma.host.create({
			data: { username, password, name, email, phoneNumber, profilePicture, aboutMe },
		});

		console.log("[Service] createHost - Host created successfully:", newHost.id);
		return { status: 201, data: newHost };
	} catch (error) {
		console.error("[Service] createHost - Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createHost;
