import { Router } from "express";
import { getAccountsController } from "../controllers/accounts.contoller";
import { validateSession } from "../middlewares/auth.middleware";

const router = Router()

router.route('/').get([validateSession], getAccountsController)

export default router