import express from "express";
import getProperties from "../services/properties/getProperties.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import createProperty from "../services/properties/createProperty.js";
import updateProperty from "../services/properties/updateProperty.js";
import deleteProperty from "../services/properties/deleteProperty.js";
import authenticate from "../middleware/authenticate.js";
import requestLogger from "../middleware/requestLogger.js";
import validateProperty from "../middleware/validateProperty.js";

const propertiesRouter = express.Router();

// Middleware voor logging
// propertiesRouter.use(requestLogger);

// GET /properties
propertiesRouter.get("/", async (req, res, next) => {
	try {
		const { location, pricePerNight, amenities } = req.query;
		const filters = { location, pricePerNight, amenities };
		const properties = await getProperties(filters);
		res.status(200).json(properties);
	} catch (error) {
		console.error("[GET] /properties - Error:", error.message);
		next(error);
	}
});

// GET /properties/:id
propertiesRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching property with ID: ${id}`);

		const property = await getPropertyById(id);

		if (!property) {
			console.warn(`Property with ID ${id} not found`);
			return res.status(404).json({ message: `Property with ID ${id} not found` });
		}

		res.status(200).json(property);
	} catch (error) {
		console.error(`Error in GET /properties/${id}: ${error.message}`);
		res.status(500).json({ message: "An error occurred while fetching the property." });
	}
});

// POST /properties
propertiesRouter.post("/", authenticate, validateProperty, async (req, res, next) => {
	try {
		const newProperty = await createProperty(req.body);
		console.log("[POST] /properties - Created new property successfully");
		res.status(201).json(newProperty);
	} catch (error) {
		console.error("[POST] /properties - Error:", error.message);
		next(error);
	}
});

// PUT /properties/:id
propertiesRouter.put("/:id", authenticate, validateProperty, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedProperty = await updateProperty(id, req.body);

		if (!updatedProperty) {
			console.warn(`[PUT] /properties/${id} - Property not found`);
			return res.status(404).json({ message: `Property with id ${id} not found` });
		}

		console.log(`[PUT] /properties/${id} - Updated property successfully`);
		res.status(200).json(updatedProperty);
	} catch (error) {
		console.error(`[PUT] /properties/${id} - Error:`, error.message);
		next(error);
	}
});

// DELETE /properties/:id
propertiesRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting property with ID: ${id}`);

		const deletedProperty = await deleteProperty(id);
		if (!deletedProperty) return res.status(404).json({ message: `Property with ID ${id} not found` });

		res.status(200).json({ message: `Property with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /properties/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the property." });
	}
});

export default propertiesRouter;
