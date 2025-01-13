import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const loginUser = async (username, password) => {
	const user = await prisma.user.findUnique({
		where: { username },
	});

	if (!user) {
		throw new Error("Gebruiker niet gevonden");
	}

	if (user.password !== password) {
		throw new Error("Onjuist wachtwoord");
	}

	const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || "geheimestandaardkey", {
		expiresIn: "1h",
	});

	return token;
};

export default loginUser;
