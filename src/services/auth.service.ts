import {
    ForgotPasswordDTO,
    IService,
    LoginDTO,
    RefreshTokenDTO,
    SignupDTO,
    VerifyDeviceChangeOTPDTO
} from "../interfaces";

import {prisma} from "../lib/db";
import {BadRequestError, CustomErrorCode, NotFoundError, UnAuthorizedError} from "../exceptions";
import bcrypt from "bcryptjs";
import {generateAccessToken, generateRefreshToken} from "../helpers";

// Souce of Truth -> Database

class AuthService {

    static initialize() {
        new AuthService();
    }

    public static async signup(input: SignupDTO): Promise<IService> {
        const {email, password, firstName, lastName, deviceId} = input;

        const existingUser = await prisma.users.findUnique({where: {email}});
        if (existingUser) {
            throw new BadRequestError({
                msg: "Account with the email already exists",
                errorCode: CustomErrorCode.DUPLICATE_RESOURCE
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        // TODO: phone and company fields need to be added to the Users model in schema.prisma
        const user = await prisma.users.create({
            data: {email, firstName, lastName},
        });

        await prisma.userAuths.create({
            data: {userId: user.id, passwordHash},
        });

        const tokenPayload = {userId: user.id, email: user.email, deviceId};
        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        // First device is auto-recognized on signup
        await prisma.userTokens.create({
            data: {userId: user.id, deviceId, accessToken, refreshToken},
        });

        return {
            success: true,
            message: "Signup successful",
            data: {
                accessToken,
                refreshToken,
                user: {id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName},
            },
        };
    }

    public static async login(input: LoginDTO): Promise<IService> {

        //check if the user email is valid and verify the user exist in the database
        // verify they are using the right password...
        // verify the deviceId is a recognised device, if not,
        // we send an email OTP to the user email to let them know that an
        // unrecognised device is trying to access their account from a location
        // that is not recognised.
        // if the device is not recognised, we block the user from logging in and sent them email OTP to verify their identity.

        // if all are true, we generate a JWT tokens and return it to the client.

        return {
            success: true,
            message: "Login successful",
            data: {
                accessToken: "",
                refreshToken: "",
                user: {}
            }
        }
    }

    public static async verifyDeviceChange(input: VerifyDeviceChangeOTPDTO): Promise<IService> {
        return {
            success: true,
            message: "Device change verified",
            data: {
                accessToken: "",
                refreshToken: "",
                user: {}
            }
        }
    }


    // Refresh Tokens -> These are tokens use in the background to keep the user logged in without them having to re-enter their credentials.
    // They are usually long-lived and can be used to obtain new access tokens when the old ones expire.
    public static async refreshToken(input: RefreshTokenDTO): Promise<IService> {
        return {
            success: true,
            message: "Token refreshed",
            data: {
                accessToken: "",
                refreshToken: "",
                user: {}
            }
        }
    }

    public static async forgotPassword(input: ForgotPasswordDTO): Promise<IService> {
        return {
            success: true,
            message: "Password reset link sent to your email",
        }
    }

    public static async resetPassword(input: ForgotPasswordDTO): Promise<IService> {
        return {
            success: true,
            message: "Password reset successful",
        }
    }

}


export default AuthService;