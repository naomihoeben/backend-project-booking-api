import express from "express";
import getUsers from "../services/users/getUsers.js";
import createUser from "../services/users/createUser.js";
import validateUser from "../middleware/validateUser.js";
import authenticate from "../middleware/authenticate.js";
import getUserById from "../services/users/getUserById.js";
import updateUser from "../services/users/updateUser.js";
import deleteUser from "../services/users/deleteUser.js";

const usersRouter = express.Router();

// GET /users
usersRouter.get("/", async (req, res, next) => {
	try {
		const { username, email } = req.query;
		const filters = { username, email };

		console.log(`Fetching users with filters:`, filters);

		const users = await getUsers(filters);

		if (users.length === 0) {
			console.log("No users found with the provided filters:", filters);
			return res.status(404).json({ message: "No users found" });
		}

		console.log(`Found ${users.length} users`);
		res.status(200).json(users);
	} catch (error) {
		console.error(`Error in GET /users: ${error.message}`);
		next(error);
	}
});

// POST /users
usersRouter.post("/", authenticate, validateUser, async (req, res, next) => {
	try {
		const userData = req.body;
		const newUser = await createUser(userData);

		console.log(`User created with ID: ${newUser.id}, username: ${newUser.username}`);
		res.status(201).json(newUser);
	} catch (error) {
		console.error(`Error in POST /users: ${error.message}`);
		next(error);
	}
});

// GET /users/:id
usersRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching user with ID: ${id}`);

		const user = await getUserById(id);

		if (!user) {
			console.error(`User with ID ${id} not found`);
			return res.status(404).json({ message: `User with ID ${id} not found` });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(`Error in GET /users/:id: ${error.message}`);
		return res.status(500).json({ message: "An error occurred while fetching the user." });
	}
});

// PUT /users/:id
usersRouter.put("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updateData = req.body;

		console.log(`Updating user with ID: ${id} and data:`, updateData);
		const updatedUser = await updateUser(id, updateData);

		if (!updatedUser) {
			console.log(`User with ID ${id} not found for update`);
			return res.status(404).json({ message: `User with id ${id} not found` });
		}

		console.log(`User with ID ${id} updated successfully`);
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(`Error in PUT /users/:id: ${error.message}`);
		next(error);
	}
});

// DELETE /users/:id
usersRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting user with ID: ${id}`);

		const deletedUser = await deleteUser(id);

		if (!deletedUser) {
			return res.status(404).json({ message: `User with ID ${id} not found` });
		}

		res.status(200).json({ message: `User with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /users/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the user." });
	}
});

export default usersRouter;
