const express=require('express');
const Router =express.Router();


const userService=require('../Services/userServices');

Router.post('/login',userService.userLogin);
Router.post('/register',userService.userSignup);

Router.post('/forget-Password', userService.forgetPassword);

Router.post('/listdata/:listName/addMovie', userService.addMovieToList);


module.exports=Router