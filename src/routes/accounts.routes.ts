import { Router } from "express";
import { addAccountController, editAccountController, getAccountsController } from "../controllers/accounts.contoller";
import { validateSession } from "../middlewares/auth.middleware";
import { validateSchema } from "../middlewares/zod.middleware";
import { addAccountSchema, editAccountSchema } from "../schemas/accounts.schema";

const router = Router()

router.route('/').get([validateSession], getAccountsController)
router.route('/').post([validateSession, validateSchema(addAccountSchema)], addAccountController)
router.route('/:accountId').patch([validateSession, validateSchema(editAccountSchema)], editAccountController)

export default router