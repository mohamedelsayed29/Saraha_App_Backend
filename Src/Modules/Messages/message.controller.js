import { Router } from "express";
import * as messageService from './message.service.js'
import { cloudFileUpload } from "../../Utils/multer/cloud.multer.js";
import { fileValidation } from "../../Utils/multer/local.multer.js";
import { validation } from "../../Middlewares/validation.middleware.js";
import { getMessageVakidation, sendMessageValidation } from "./message.validation.js";
import { authentication, tokenTypeEnum } from "../../Middlewares/authentcaion.middleware.js";

const router = Router();

router.post('/:reciever_id/send-message',
    cloudFileUpload({validation:[fileValidation.documents]}).array("attatchments",3),
    validation(sendMessageValidation),
    messageService.sendMessage
);

router.post('/:reciever_id/sender',
    authentication({tokenType:tokenTypeEnum.access}),
    cloudFileUpload({validation:[fileValidation.documents]}).array("attatchments",3),
    validation(sendMessageValidation),
    messageService.sendMessage
);

router.get('/:userId/get-messages',
    validation(getMessageVakidation),
    messageService.getMessages
)


export default router;