import { Router } from "express";
import { registerUserController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/zod.middleware";
import { registerUserSchema } from "../schemas/auth.schema";

const router = Router()

router.route('/register').post([validateSchema(registerUserSchema)],registerUserController)

export default router