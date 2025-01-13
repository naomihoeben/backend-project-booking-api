import express from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import createAmenity from "../services/amenities/createAmenity.js";
import updateAmenity from "../services/amenities/updateAmenity.js";
import deleteAmenity from "../services/amenities/deleteAmenity.js";
import validateAmenity from "../middleware/validateAmenity.js";
import authenticate from "../middleware/authenticate.js";

const amenitiesRouter = express.Router();

// GET /amenities
amenitiesRouter.get("/", async (req, res, next) => {
	try {
		const amenities = await getAmenities();
		res.status(200).json(amenities);
	} catch (error) {
		next(error);
	}
});

// GET /amenities/:id
amenitiesRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching amenity with ID: ${id}`);

		const amenity = await getAmenityById(id);

		if (!amenity) {
			console.warn(`Amenity with ID ${id} not found`);
			return res.status(404).json({ message: `Amenity with ID ${id} not found` });
		}

		res.status(200).json(amenity);
	} catch (error) {
		console.error(`Error in GET /amenities/${id}: ${error.message}`);
		res.status(500).json({ message: "An error occurred while fetching the amenity." });
	}
});

// POST /amenities
amenitiesRouter.post("/", authenticate, validateAmenity, async (req, res, next) => {
	try {
		const newAmenity = await createAmenity(req.body);
		res.status(201).json(newAmenity);
	} catch (error) {
		next(error);
	}
});

// PUT /amenities/:id
amenitiesRouter.put("/:id", authenticate, validateAmenity, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedAmenity = await updateAmenity(id, req.body);

		if (!updatedAmenity) {
			return res.status(404).json({ message: `Amenity with id ${id} not found` });
		}

		res.status(200).json(updatedAmenity);
	} catch (error) {
		next(error);
	}
});

// DELETE /amenities/:id
amenitiesRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting amenity with ID: ${id}`);

		const deletedAmenity = await deleteAmenity(id);

		if (!deletedAmenity) {
			return res.status(404).json({ message: `Amenity with ID ${id} not found` });
		}

		res.status(200).json({ message: `Amenity with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /amenities/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the amenity." });
	}
});

export default amenitiesRouter;
