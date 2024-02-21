import { Document } from "mongoose";


 export interface IUserSchema extends Document {
     id: string;
     username: string;
     email: string;
     password: string;
     createdAt: Date;
     updatedAt: Date;
   }
   