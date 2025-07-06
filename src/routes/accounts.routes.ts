import { Router } from "express";
import { addAccountController, getAccountsController } from "../controllers/accounts.contoller";
import { validateSession } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { addAccountSchema } from "../schemas/accounts.schema";

const router = Router()

router.route('/').get([validateSession], getAccountsController)
router.route('/').post([validateSession, validateSchema(addAccountSchema)], addAccountController)

export default router