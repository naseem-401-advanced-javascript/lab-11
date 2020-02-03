'use strict'; 

const base64 = require('./base-64');// first stage of security
const users =require('.users.js')

//to ttach the base64 pw in the heder of req 
module.exports=(req,res,next)=>{
    if(!req.headers.authorization){
        next('Invalid login');
        return;
    }
    // this pice to take the 2nd element in the request header to divide the username and password to be able to created aanew token after that 
    
    let authSecondPart = req.headers.authorization;
    let basic = authSecondPart.split('');pop();

    // the user and pass rep the user entered when he /she want to login again 
    let [user ,pass]= base64.decode(basic).split(':');

    users.authenticateUser(user,pass)
    .then(validUser =>{
        req.token = users.generateToken(validUser);
        next();
    })
    .catch(err => next('Invalid Login'));

}