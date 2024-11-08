import { Router } from 'express'
import { checkAdmin, checkAuthentication, processJWT } from '../middlewares/auth.js'

const router = Router()

router.get("/",
	processJWT,
	checkAuthentication,
	(req, res) => {
		
	}
)

export default router