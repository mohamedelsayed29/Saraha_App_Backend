import mongoose, { Schema } from "mongoose";

export const messageSchema = new Schema({
    content:{
        type:String,
        minLength: 2 ,
        maxLength: 20000,
        required: function(){
            return this.attachments?.length ? false : true
        },
    },
    attachments:[
        {
            public_id:String ,
            secure_url:String
        }
    ],
    reciever_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    sender_id:{
        type:Schema.Types.ObjectId,
        ref:"User",
    }
},
{timestamps:true}
); 
export const MessageModel = mongoose.models.Message || mongoose.model("Message", messageSchema);
