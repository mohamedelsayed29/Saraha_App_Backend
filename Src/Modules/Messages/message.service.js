import * as dbService from '../../DB/dbService.js'
import { MessageModel } from '../../DB/Models/message.model.js';
import { UserModel } from '../../DB/Models/user.model.js';
import { uploadToCloudinary } from '../../Utils/multer/cloud.multer.js';
import { successResponse } from '../../Utils/successResponse.utils.js';

export const sendMessage = async(req , res , next)=>{
    const { reciever_id } = req.params;
    const { content } = req.body;

    if(!await dbService.findOne({
        model:UserModel,
        filter:{
            _id:reciever_id,
            freezed_at: null,
            confirm_email:{$exists:true}
        }
    })){
        return next(new Error("Invalid Recipient Account" , {cause:404}))
    }

    const attatchments = []

    if(req.files){
        for (const file of req.files) {
            const {secure_url , public_id } = await uploadToCloudinary({filePath:file.path , folder:`SarahaApp/Messages/${reciever_id}`})
            attatchments.push({secure_url , public_id})
        }
    }

    const message = await dbService.create({
        model:MessageModel,
        data:[{
            content,
            attatchments,
            reciever_id,
            sender_id: req.user?._id
        }]
    })

    return successResponse({
        res,
        statusCode:201,
        message:"Message Send Successfully",
        data:{message}
    })
}

export const getMessages = async(req , res , next)=>{
    const { userId } = req.params;

    const messages = await dbService.find({
        model:MessageModel,
        filter: {
            reciever_id: userId
        },
        populate:[
            { path: "sender_id", select: "name email profile_image" }
        ]
    })
    return successResponse({
        res,
        statusCode:200,
        message:"Message Fetched Successfully",
        data:{messages}
    })
}