import { Router } from "express";
import { loginUserController, registerUserController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/zod.middleware";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";

const router = Router()

router.route('/register').post([validateSchema(registerUserSchema)],registerUserController)
router.route('/login').post([validateSchema(loginUserSchema)],loginUserController)

export default router