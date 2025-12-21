import { Router } from "express";
import * as userService from "./user.service.js"
import { authentication, authorization, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";
import { endpoints } from "./user.authorization.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { 
    freezeAccountValidation,
    hardDeleteAccountValidation,
    restoreFreezeAccountAdminValidation,
    restoreFreezeAccountUserValidation,
    shareProfileValidation,
    updatePasswordValidation,
    updateProfileValidation
} from "./user.validation.js";
import { auth } from "google-auth-library";

const router = Router();
router.get('/get-user-profile',
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.getProfile}),
    userService.getUserProfile
);
router.get('/share-profile/:userId',
    validation(shareProfileValidation),
    userService.shareProfile
);
router.patch('/update-profile',
    validation(updateProfileValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.updateProfile}),
    userService.updateProfile
);
router.delete('/freeze-account/{:userId}',
    validation(freezeAccountValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.freezeAccount}),
    userService.freezeAccount
)
router.patch('/restore-account/:userId',
    validation(restoreFreezeAccountAdminValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.restoreAccountByAdmin}),
    userService.restoreAccountByAdmin
);
router.patch('/restore-account-by-user',
    validation(restoreFreezeAccountUserValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.restoreAccountByUser}),
    userService.restoreAccountByUser
);
router.delete('/delete-account/:userId',
    validation(hardDeleteAccountValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.deleteAccount}),
    userService.deleteAccount
);
router.patch('/update-password',
    validation(updatePasswordValidation),
    authentication({tokenType:tokenTypeEnum.access}),
    authorization({accessRoles:endpoints.updatePassword}),
    userService.updatePassword
);
export default router;