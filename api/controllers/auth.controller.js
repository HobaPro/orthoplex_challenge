import { 
    NewUser,
    UpdateUser,
    IsExistsUser,
    GetUser,
    DeleteUser,
 } from "../models/users.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function Register(req, res)
{
    res.contentType('application/json');

    try
    {
        if(await IsExistsUser("username", req.body.username)){
            res.status(409).send({

                data: null,
                message: "Username is Aleardy Exists.",
            });
            return; 
        }

        if(await IsExistsUser("email", req.body.email))
        {
            res.status(409).send({

                data: null,
                message: "E-Mail is Aleardy Exists.",
            });
            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await NewUser(req.body.username, req.body.email, hashedPassword);


        console.log(newUser);

        res.status(200).send({

            data: {
                username: newUser.username,
                email: newUser.email,
            },
            message: "User has Successfully Created.",
        });
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function LogIn(req, res)
{
    res.contentType('application/json');

    try
    {
        const user = await GetUser("email", req.body.email);

        if (!user)
        {
            res.status(404).send({

                data: null,
                message: "User not Found",
            });

            return;
        }

        let samePassword = await bcrypt.compare(req.body.password, user.password);

        if (!samePassword){

            res.status(401).send({

                data: null,
                message: "User not Found",
            });

            return;
        }

        const token = jwt.sign({
            userID: user.id,
            email: user.email,
        }, process.env.TOKEN_KEY, {
            expiresIn: '14d',
        });

        res.status(200).send({ token, message: "Login has Successfully." });
    }
    catch(error)
    {
        console.log(error);
    }
}

export async function VerifyUser(req, res)
{
    const user = await UpdateUser(req.params.id, "verified", 1);

    if (!user)
    {
        res.status(403).send({

            data: null,
            message: "Verification Error.",
        });

        return;
    }

    res.status(200).send({ data: null, message: "Your account is Verified." });
}

export async function CGetUser(req, res)
{
    res.contentType('application/json');

    const user = await GetUser("id", req.params.id);

    if (!user)
    {
        res.status(403).send({
            success: false,
            data: null,
            message: "Verification Error.",
        });

        return;
    }

    res.status(200).send({ success: true, data: user, message: "" });
}

export function CheckUserAuthorization(req, res, next)
{
    res.contentType('application/json');

    try{
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if(!token) return res.status(401);

        jwt.verify(token, process.env.TOKEN_KEY, (error, user) => {
            if(error) return res.senstatus(403);
            req.user = user;

            next();
        });
    }catch(error){
        res.status(401).send({success: false, message: "Unauthorized"})
    }
}

export async function CDeleteUser(req, res)
{
    res.contentType('application/json');

    const user = await DeleteUser("email", req.body.email);

    res.status(200).send({ data: null, message: "User Deleted." });
}