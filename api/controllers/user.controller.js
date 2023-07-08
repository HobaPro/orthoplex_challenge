import url from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.model.js";

//This Controller Is Handling Users Registraion.
export async function Register(req, res)
{
    res.contentType('application/json');

    try
    {
        const { username, email, password } = req.body;

        //Check If Username Is Already Exists Or Not.
        const existsUsername = await Users.findOne({
            where: { username: username, }
        });

        if(existsUsername)
        {
            res.status(409).send({

                data: null,
                message: "Username is Aleardy Exists.",
            });
            return; 
        }
        //

        //Check If E-Mail is Already Exists Or Not.
        const existsemail = await Users.findOne({
            where: { email: email, }
        });

        if(existsemail)
        {
            res.status(409).send({

                data: null,
                message: "E-Mail is Aleardy Exists.",
            });
            return; 
        }
        //

        //Hash User Password After Insert Into Database.
        const hashedPassword = await bcrypt.hash(password, 10);

        //Insert User Into Database.
        const user = await Users.create({
            username: username,
            email: email,
            password: hashedPassword,
        });

        //console.log(user);

        res.status(200).send({

            data: {
                username: user.username,
                email: user.email,
            },
            message: "User has Successfully Created.",
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

//This Controller Is Handling Users Login.
export async function LogIn(req, res)
{
    res.contentType('application/json');

    try
    {
        const { email, password } = req.body;

        //Check If User Is Exists, And Return Him Data If Exists.
        const user = await Users.findOne({
            where: { email }
        });

        //User Isn't Exists Hanling.
        if (!user)
        {
            res.status(404).send({
                success: false,
                data: null,
                message: "User not Found",
            });

            return;
        }
        //

        //Compare User Password With Sent With Request.
        let samePassword = await bcrypt.compare(password, user.password);

        if (!samePassword)
        {
            res.status(401).send({
                success: false,
                data: null,
                message: "Password Wrong",
            });

            return;
        }

        //Generate Token.
        const token = jwt.sign({
            userID: user.id,
            email: user.email,
        }, process.env.TOKEN_KEY, {
            expiresIn: '14d',
        });

        res.status(200).send({
            success: true,
            token,
            message: "Login has Successfully."
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

//Verify User Controller.
export async function VerifyUser(req, res)
{
    res.contentType('application/json');

    try
    {
        //Get User If it't Exists.
        const user = await Users.findOne({
            where: { id: req.params.id }
        });

        //User Isn't Exists Hanling.
        if (!user)
        {
            res.status(404).send({
                success: false,
                data: null,
                message: "User not Found",
            });

            return;
        }
        //

        //Verify User Account.
        user.verified = true;

        const updatedUser = await user.save();
        //

        res.status(200).send({
            success: true,
            data: {
                username: updatedUser.username,
                email: updatedUser.email,
            },
            message: "Your account is Verified."
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

//This Controller Is Return Data of Specific User From Database.
export async function GetUser(req, res)
{
    res.contentType('application/json');

    try
    {
        const { userID, email } = req.user;

        //Get User If It's Exists.
        const user = await Users.findOne({
            where: { id: userID, },
        });

        //User Isn't Exists Hanling.
        if(!user)
        {
            res.status(404).send({
                success: false,
                data: null,
                message: "Faild to Get User, User Not Found.",
            });
    
            return;
        }

        res.status(200).send({
            success: true,
            data: user,
            message: ""
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function GetUsers(req, res)
{
    res.contentType('application/json');

    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    //Get Specific 10 Users
    const users = await Users.findAll({
        limit: 10,
        offset: ((query.page - 1) * 10),
    });

    //Users Isn't Exists Hanling.
    if(!users){
        res.status(403).send({
            success: false,
            data: null,
            message: "Faild to Get Users",
        });
    }

    res.status(200).send({
        success: true,
        data: users,
        message: ""
    });
}

export function CheckUserAuthorization(req, res, next)
{
    res.contentType('application/json');

    try{
        //Get Token From Request Header
        const authHeader = req.headers["authorization"];
        let token = null;

        if (authHeader)
        {
            console.log(authHeader);
            token = authHeader.split(' ')[1];
            console.log(token);
        }
        else
        {
            res.status(401).send({
                success: false,
                data: null,
                message: "Unauthorized"
            });

            return;
        }
        
        //Trow Exeption If Token Does't Exists. 
        if(!token)
        {
            res.status(401).send({
                success: false,
                data: null,
                message: "Unauthorized"
            });

            return;
        }

        //Verify Token And Send Data To Next Middleware If Token Valid.
        jwt.verify(token, process.env.TOKEN_KEY, (error, user) => {
            if(error)
            {
                res.status(401).send({
                    success: false,
                    data: null,
                    message: "Unauthorized"
                });

                return;
            }
            req.user = user;

            next();
        });
    }catch(error){
        console.log(error);
    }
}

//This Controller Is Deleting Users.
export async function DeleteUser(req, res)
{
    res.contentType('application/json');

    try
    {
        const { email } = req.body;

        //Delete User From Database.
        const user = Users.destroy({
            where: { email },
        });

        res.status(200).send({
            success: true,
            data: {
                username: user.username,
                email: user.email,
            },
            message: "User Deleted."
        });
    }
    catch(error)
    {
        console.log(error);
    }
}