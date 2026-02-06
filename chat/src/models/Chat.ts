import mongoose ,{Schema,Document} from "mongoose"

export interface IChat extends Document{
    users:string[];
    lastestMessage:{
        text:string,
        sender:string
    };
    createdAt:Date;
    updatedAt:Date;
} 

const schema:Schema<IChat> = new Schema({
  users:[{type:String,required:true}],
  lastestMessage:{
    text:String,
    sender:String
  }
},
  {
    timestamps:true
  }
)

export const Chat = mongoose.model<IChat>("chat",schema)