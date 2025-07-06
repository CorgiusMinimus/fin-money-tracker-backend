import { Router } from "express";
import { loginUserController, logoutSessionController, registerUserController } from "../controllers/auth.controller";
import { validateSchema } from "../middlewares/zod.middleware";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";
import { validateSession } from "../middlewares/auth.middleware";

const router = Router()

router.route('/register').post([validateSchema(registerUserSchema)],registerUserController)
router.route('/login').post([validateSchema(loginUserSchema)],loginUserController)
router.route('/logout').delete([validateSession], logoutSessionController)

export default router