import { Router } from "express";
import * as authService from "./auth.service.js";
import { authentication, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { confirmEmailValidation, loginValidation, signUpValidation, socialLoginValidation } from "./auth.validation.js";

const router = Router();

router.post('/signup',validation(signUpValidation),authService.signup);
router.post('/login',validation(loginValidation),authService.login);
router.post('/social-login',validation(socialLoginValidation),authService.loginWithGamil);
router.get('/refresh-token',authentication({tokenType:tokenTypeEnum.refresh }),authService.refreshToken);
router.patch('/confirm-email',validation(confirmEmailValidation),authService.confirmEmail);
export default router;