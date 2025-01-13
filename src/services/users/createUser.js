import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (userData) => {
	const { username, password, name, email, phoneNumber, profilePicture } = userData;

	if (!username || !password || !name || !email || !phoneNumber || !profilePicture) {
		const error = new Error("All required fields must be provided.");
		error.status = 400;
		throw error;
	}

	try {
		const newUser = await prisma.user.create({
			data: { username, password, name, email, phoneNumber, profilePicture },
		});

		console.log("User created successfully:", newUser.id);
		return { status: 201, data: newUser };
	} catch (error) {
		console.error("Error:", error.message);
		error.status = 500;
		throw error;
	}
};

export default createUser;
