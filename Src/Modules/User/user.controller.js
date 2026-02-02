import { Router } from "express";
import * as userService from "./user.service.js"
import { authentication, authorization, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";
import { endpoints } from "./user.authorization.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { 
    coverImageValidation,
    freezeAccountValidation,
    hardDeleteAccountValidation,
    profileImageValidation,
    restoreFreezeAccountAdminValidation,
    restoreFreezeAccountUserValidation,
    shareProfileValidation,
    updatePasswordValidation,
    updateProfileValidation
} from "./user.validation.js";
import { fileValidation, localFileUpload } from "../../Utils/multer/local.multer.js";
import { cloudFileUpload } from "../../Utils/multer/cloud.multer.js";

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

router.patch('/update-profile-image',
    authentication({tokenType:tokenTypeEnum.access}),
    // localFileUploade({customPath:"UserImage" , validation:fileValidation.image}).single("profileImage"),
    // validation(profileImageValidation),
    cloudFileUpload({validation:[...fileValidation.image]}).single("image"),
    userService.updateProfileImage
);

router.patch('/update-cover-images',
    authentication({tokenType:tokenTypeEnum.access}),
    // localFileUpload({customPath:"UserCoverImages" , validation:fileValidation.image}).array("coverImages",5),
    // validation(coverImageValidation),
    cloudFileUpload({validation:[...fileValidation.image]}).array("images",5),
    userService.updateCoverImages
);
export default router; 