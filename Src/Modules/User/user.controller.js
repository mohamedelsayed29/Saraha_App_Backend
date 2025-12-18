import { Router } from "express";
import * as userService from "./user.service.js"
import { authentcation, authoritation, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";
import { endpoints } from "./user.authorization.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { shareProfileValidation, updateProfileValidation } from "./user.validation.js";

const router = Router();
router.get('/get-user-profile',
    authentcation({tokenType:tokenTypeEnum.access}),
    authoritation({accessRoles:endpoints.getProfile}),
    userService.getUserProfile
);
router.get('/share-profile/:userId',
    validation(shareProfileValidation),
    userService.shareProfile
);
router.patch('/update-profile',
    validation(updateProfileValidation),
    authentcation({tokenType:tokenTypeEnum.access}),
    authoritation({accessRoles:endpoints.updateProfile}),
    userService.updateProfile
);

export default router; 