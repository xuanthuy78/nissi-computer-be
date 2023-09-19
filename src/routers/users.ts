import express from "express";
import { userController } from "../app/controllers";

const router = express.Router();

router.post("/register", userController.register);
router.get("/login", userController.login);

export default router;
