import { Router } from "express";
import * as userService from "./user.service.js"
import { authentcation, authoritation, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";
import { endpoints } from "./user.authorization.js";

const router = Router();
router.get('/get-user-profile',authentcation({tokenType:tokenTypeEnum.access}),authoritation({accessRoles:endpoints.getProfile}),userService.getUserProfile)
export default router;