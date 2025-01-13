import express from "express";
import getHosts from "../services/hosts/getHosts.js";
import getHostById from "../services/hosts/getHostById.js";
import createHost from "../services/hosts/createHost.js";
import updateHost from "../services/hosts/updateHost.js";
import deleteHost from "../services/hosts/deleteHost.js";
import validateHost from "../middleware/validateHost.js";
import authenticate from "../middleware/authenticate.js";

const hostsRouter = express.Router();

// GET /hosts
hostsRouter.get("/", async (req, res, next) => {
	try {
		const { name } = req.query;
		const filters = { name };

		console.log(`[GET] /hosts - Filters:`, filters);
		const hosts = await getHosts(filters);

		if (hosts.length === 0) {
			console.log("[GET] /hosts - No hosts found with filters:", filters);
			return res.status(404).json({ message: "No hosts found" });
		}

		console.log(`[GET] /hosts - Retrieved ${hosts.length} hosts`);
		res.status(200).json(hosts);
	} catch (error) {
		console.error("[GET] /hosts - Error:", error.message);
		next(error);
	}
});

// GET /hosts/:id
hostsRouter.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Fetching host with ID: ${id}`);

		const host = await getHostById(id);

		if (!host) {
			console.warn(`Host with ID ${id} not found`);
			return res.status(404).json({ message: `Host with ID ${id} not found` });
		}

		res.status(200).json(host);
	} catch (error) {
		console.error(`Error in GET /hosts/${id}: ${error.message}`);
		res.status(500).json({ message: "An error occurred while fetching the host." });
	}
});

// POST /hosts
hostsRouter.post("/", authenticate, validateHost, async (req, res, next) => {
	try {
		const newHost = await createHost(req.body);
		console.log("[POST] /hosts - Created new host successfully");
		res.status(201).json(newHost);
	} catch (error) {
		console.error("[POST] /hosts - Error:", error.message);
		next(error);
	}
});

// PUT /hosts/:id
hostsRouter.put("/:id", authenticate, validateHost, async (req, res, next) => {
	try {
		const { id } = req.params;
		const updatedHost = await updateHost(id, req.body);

		if (!updatedHost) {
			console.warn(`[PUT] /hosts/${id} - Host not found`);
			return res.status(404).json({ message: `Host with id ${id} not found` });
		}

		console.log(`[PUT] /hosts/${id} - Updated host successfully`);
		res.status(200).json(updatedHost);
	} catch (error) {
		console.error(`[PUT] /hosts/${id} - Error:`, error.message);
		next(error);
	}
});

// DELETE /hosts/:id
hostsRouter.delete("/:id", authenticate, async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log(`Deleting host with ID: ${id}`);

		const deletedHost = await deleteHost(id);
		if (!deletedHost) return res.status(404).json({ message: `Host with ID ${id} not found` });

		res.status(200).json({ message: `Host with ID ${id} successfully deleted` });
	} catch (error) {
		console.error(`Error in DELETE /hosts/:id: ${error.message}`);
		res.status(500).json({ message: "An error occurred while deleting the host." });
	}
});

export default hostsRouter;
