const { json } = require('body-parser');
const formidable = require('formidable');
const validator = require('Validator');
const registerModel = require('../models/authModel');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports.userRegister = (req,res) => {
    const form = formidable();
    form.parse(req, async (err, fields, files) => {

        const {
            userName, email, password,confirmPassword
        } = fields;

        const {image} = files;
        const error = [];

        if(!userName){
            error.push('Please provide your user name');
        }
        if(!email){
            error.push('Please provide your Email');
        }
        // if(email && !validator.isEmail(email)){
        //     error.push('Please provide your Valid Email');
        // }
        if(!password){
            error.push('Please provide your Password');
        }
        if(!confirmPassword){
            error.push('Please provide your confirm Password');
        }
        if(password && confirmPassword && password !== confirmPassword){
            error.push('Your Password and Confirm Password not same');
        }
        if(password && password.length < 6){
            error.push('Please provide password mush be 6 charecter');
        }
        if(Object.keys(files).length === 0){
            error.push('Please provide user image');
        }
        if(error.length > 0){
            res.status(400).json({
                error:{
                        errorMessage : error
                }
            })
        } else {
            const getImageName = files.image.originalFilename;
           // console.log(getImageName);
            const randomNumber = Math.floor(Math.random() * 99999);
            const newImageName = randomNumber + getImageName;
           // console.log(newImageName);
            files.image.originalFilename = newImageName;
            const newPath = __dirname + `../../../frontend/public/image/${files.image.originalFilename}`;
            console.log(getImageName);
            console.log(newImageName);
            console.log(newPath);
            try {
                const checkUser = await registerModel.findOne({
                    email:email
                });
                if(checkUser){
                    res.status(404).json({
                        error:{
                            errorMessage:['email already exists']
                        }
                    })
                }else{
                    fs.copyFile(files.image.filepath,newPath,async(error)=>{
                        if(!error){
                            const userCreate = await registerModel.create({
                                userName,
                                email,
                                password: await bcrypt.hash(password,10),
                                image:files.image.originalFilename
                            });
                            const token = jwt.sign({
                                id:userCreate._id,
                                email:userCreate.email,
                                userName:userCreate.userName,
                                image:userCreate.image,
                                userTime:userCreate.createdAt,

                            },process.env.SECRET_KEY,{
                                expiresIn:process.env.TOKEN_EXP
                            });
                            //console.log(token);
                            const options = { 
                                expire: new Date(Date.now()) + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                            }

                            console.log('User Registration Successfully');
                            res.status(201).cookie('authToken',token,options).json({
                                successMessage: 'You registered successfully',token
                            });
                        }else{
                            res.status(500).json({
                                error:{
                                    errorMessage:['Internal Server Error']
                                }
                            });
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error:{
                        errorMessage:['Internal Server Error']
                    }
                });
            }
        }
        // console.log(error);


    })
   
}