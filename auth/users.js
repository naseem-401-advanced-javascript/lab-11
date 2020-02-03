'use strict';

const bcryptjs =require('bcryptjs');
const jws = require('jsonwebtoken');//return the output to ajson format

let SECRET= 'nasa1993';

//save all users
let db ={};
//each one info
let users ={};

users.save= async function(userInfoObject){
    if(db[userInfoObject.username]){
        userInfoObject.password = await bcryptjs.hash(userInfoObject.password,5);
        db[userInfoObject.username]=userInfoObject;// save ( username, password ) into DB by the username 
        return userInfoObject;
    }
return Promise.reject();
}

users.authenticateUser =async function(user,pass){
    let valid = await bcryptjs.compare(pass,db[user].password);
    return valid?db[user]:Promise.reject();
}

users.generateToken =function(user){
    let token = jwt.sign({username:user.username},SECRET);
    return token;
}

users.list =()=>db;
module.exports = users;
