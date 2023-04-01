 import mongoose from 'mongoose';

 const UserScheama = new mongoose.Schema({

    fullName:{
        type:String,
    required:true,
 },
 email: {
    type:String,
    required:true,
    unique:true,
 },
 passwordHash: {
    type:String,
    qequil:true,
 },
 avatarUrl: String,

},{
   timetamps:true, 
});

export default mongoose.model('User',UserScheama);