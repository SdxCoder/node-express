import { Router } from "express";
import { getHomePageContent } from "../controllers/homeController.js";

const router = Router();

router.get('/', getHomePageContent);

export default router;