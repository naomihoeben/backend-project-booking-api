import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateUser = async (id, updateData) => {
	try {
		const userExists = await prisma.user.findUnique({ where: { id } });
		if (!userExists) {
			console.error(`[Service] updateUser - User with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (updateData.username) updatedData.username = updateData.username;
		if (updateData.email) updatedData.email = updateData.email;
		if (updateData.password) updatedData.password = updateData.password;
		if (updateData.name) updatedData.name = updateData.name;
		if (updateData.phoneNumber) updatedData.phoneNumber = updateData.phoneNumber;
		if (updateData.profilePicture) updatedData.profilePicture = updateData.profilePicture;

		const updatedUser = await prisma.user.update({
			where: { id },
			data: updatedData,
			select: {
				id: true,
				username: true,
				name: true,
				email: true,
				phoneNumber: true,
				profilePicture: true,
			},
		});

		console.log(`[Service] updateUser - User ${id} updated successfully.`);
		return updatedUser;
	} catch (error) {
		console.error(`[Service] updateUser - Error updating user with ID ${id}: ${error.message}`);
		throw new Error(`Failed to update user. ${error.message}`);
	}
};

export default updateUser;
