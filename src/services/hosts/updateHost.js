import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const updateHost = async (id, updateData) => {
	try {
		const hostExists = await prisma.host.findUnique({ where: { id } });
		if (!hostExists) {
			console.error(`[Service] updateHost - Host with ID ${id} not found.`);
			return null;
		}

		const updatedData = {};
		if (updateData.username) updatedData.username = updateData.username;
		if (updateData.password) updatedData.password = updateData.password;
		if (updateData.name) updatedData.name = updateData.name;
		if (updateData.email) updatedData.email = updateData.email;
		if (updateData.phoneNumber) updatedData.phoneNumber = updateData.phoneNumber;
		if (updateData.profilePicture) updatedData.profilePicture = updateData.profilePicture;
		if (updateData.aboutMe) updatedData.aboutMe = updateData.aboutMe;

		const updatedHost = await prisma.host.update({
			where: { id },
			data: updatedData,
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

		console.log(`[Service] updateHost - Host ${id} updated successfully.`);
		return updatedHost;
	} catch (error) {
		console.error(`[Service] updateHost - Error updating host with ID ${id}: ${error.message}`);
		throw new Error(`Failed to update host. ${error.message}`);
	}
};

export default updateHost;
