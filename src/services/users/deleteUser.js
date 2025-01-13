import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const deleteUser = async (id) => {
	try {
		const userExists = await prisma.user.findUnique({ where: { id } });
		if (!userExists) {
			return null;
		}

		await prisma.review.deleteMany({ where: { userId: id } });
		await prisma.booking.deleteMany({ where: { userId: id } });
		const deletedUser = await prisma.user.delete({ where: { id } });
		return deletedUser;
	} catch (error) {
		console.error(`Error deleting user with ID ${id}: ${error.message}`);
		throw new Error(`Failed to delete user. ${error.message}`);
	} finally {
		await prisma.$disconnect();
	}
};

export default deleteUser;
