import config from "../config/config";
import db from "../config/db";
import tokens from "../config/tokens";
import ApiError from "../utils/ApiError";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import moment from "moment";

const createUser = async (email: string, password: string, name: string) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return await db.user.create({
        data: {
            name: name,
            email: email,
            password: hashPassword
        },
        select: {
            id: true
        }
    })
}

const handleLogin = async (email: string, password: string) => {
    const result = await db.user.findUniqueOrThrow({
        where :{
            email: email,
        },
        select: {
            id: true,
            password: true,
            role: true,
            name: true,
            email: true
        }
    })

    const matchPassword = await bcrypt.compare(password, result.password);

    if(matchPassword){
        return result
    } else {
        throw new ApiError(401, "Invalid credentials");
    }
};

const generateTokens = async (user:{ id: string, role: number, email: string }) => {
    const token_access = jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
        type: tokens.tokenTypes.ACCESS,
    },
    config.jwt.secret,
    {
        expiresIn: `${config.jwt.accessExpirationMinutes}m`
    });
    const token_access_expire = moment().add(config.jwt.accessExpirationMinutes, 'minutes').format();

    const token_refresh = jwt.sign({
        id: user.id,
        role: user.role,
        email: user.email,
        type: tokens.tokenTypes.REFRESH,
    },
    config.jwt.secret,
    {
        expiresIn: `${config.jwt.refreshExpirationDays}d`
    });
    const token_refresh_expire = moment().add(config.jwt.refreshExpirationDays, 'days').format()

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            token: token_refresh
        }
    })

    return {
        id: user.id,
        role: user.role,
        email: user.email,
        access: {
            token: token_access,
            expire: token_access_expire
        },
        refresh: {
            token: token_refresh,
            expire: token_refresh_expire
        }
    }
}

const refresh = async (token:string) => {
    const tokenData = await jwt.verify(token, config.jwt.secret);
    
    const tokenDataVerified = await db.user.findUniqueOrThrow({
        where: {
            //@ts-expect-error
            id: tokenData.id,
            token: token
        },
        select: {
            id: true,
            role: true,
            email: true
        }
    })
    const token_access = jwt.sign({
        id: tokenDataVerified.id,
        role: tokenDataVerified.role,
        email: tokenDataVerified.email,
        type: tokens.tokenTypes.ACCESS,
    },
    config.jwt.secret,
    {
        expiresIn: `${config.jwt.accessExpirationMinutes}m`
    });
    const token_access_expire = moment().add(config.jwt.accessExpirationMinutes, 'minutes').format();

    return {
        id: tokenDataVerified.id,
        role: tokenDataVerified.role,
        email: tokenDataVerified.email,
        access: {
            token: token_access,
            expire: token_access_expire
        }
    }
};

export default {
    createUser,
    handleLogin,
    generateTokens,
    refresh
}