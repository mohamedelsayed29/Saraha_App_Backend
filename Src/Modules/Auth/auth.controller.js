import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentcation, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";

const router = Router();

router.post('/signup', authService.signup);
router.post('/login', authService.login);
router.post('/social-login',authService.loginWithGamil);
router.get('/refresh-token',authentcation({tokenType:tokenTypeEnum.refresh }),authService.refreshToken);
router.patch('/confirm-email',authService.confirmEmail)
export default router;