import express from "express";
import authFilter from "../middleware/filter";

const router = express.Router();

router.get("/protected-endpoint", authFilter, (req, res) => {
	res.send("This is a protected endpoint");
});

export default router;
