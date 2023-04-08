import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import multer from 'multer';
import cors from 'cors'


import mongoose from 'mongoose';




import { registerValidation,loginValidation, postCreateValidation } from './validation.js';

import {handleValidationErrors,chekAuth} from './utils/index.js';

import {UserController,PostController} from './controllers/index.js';

const {PORT} = process.env


mongoose
.connect('mongodb+srv://admin:cccccc@cluster0.x1c2bld.mongodb.net/blog?retryWrites=true&w=majority')
.then (()=> console.log('DB ok'))
.catch ((err) => console.log('Error connecting to DB',err));




const app = express();

const storage = multer.diskStorage({
    destination:(_,__,cb)=>{
cb(null,'uploads')
    },
    filename:(_,file,cb)=>{
        cb(null,file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use(cors());

app.use('/uploads',express.static('uploads'));

app.post('/auth/login',loginValidation,handleValidationErrors,UserController.login );
app.post('/auth/register',registerValidation,handleValidationErrors, UserController.register );
app.get('/auth/me',chekAuth, UserController.getMe);

app.post('/upload',chekAuth,upload.single('image'),(req,res)=>{
    res.json({
        url: `/uploads/${req.file.originalname}`,
    })
});

app.get('/tags',PostController.getLastTags);

app.get('/posts',PostController.getAll);
app.get('/posts/tags',PostController.getLastTags);
app.get('/posts/:id',PostController.getOne);
app.post('/posts',chekAuth,postCreateValidation,handleValidationErrors,PostController.create);
app.delete('/posts/:id',chekAuth,PostController.remove);
app.patch(
    '/posts/:id',
    chekAuth,
    postCreateValidation,
    handleValidationErrors,
    PostController.update,
    );



    
app.listen(PORT,(err)=>{
    if(err) {
        return console.log(err)}
        console.log("server listening on port", `${PORT}`);
})