import AuthService from "../services/auth.service.js";
import { authCookieOptions } from "../config/cookie.config.js";

class AuthController {
  // Register a new user  
  static async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      const { user, token } = await AuthService.register({
        name,
        email,
        password,
      });

      res
        .cookie("token", token, authCookieOptions)
        .status(201)
        .json({
          success: true,
          message: "User registered successfully",
          user: {
            _id: user._id,
            id: user._id,
            name: user.name,
            email: user.email,
          },
        });
    } catch (err) {
      next(err);
    }
  }
  //get user details
  static async me(req, res, next) {
    try {
      const userId = req.userId;
      const user = await AuthService.Me(userId);
      res.status(200).json({
        success: true,
        user: {
          _id: user._id,
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

    // Login user
    static async login(req, res, next) {
        try {   
            const { email, password } = req.body;
            const { user, token } = await AuthService.Login({
                email,
                password,
            });
            res
                .cookie("token", token, authCookieOptions)
                .status(200)
                .json({
                    success: true,
                    message: "User logged in successfully",
                    user: {
                        _id: user._id,
                        id: user._id,
                        name: user.name,
                        email: user.email,
                    },
                });
        } catch (err) {
            next(err);
        }
    }

    // Logout user
    static async logout(req, res, next) {
        try {
            res
                .clearCookie("token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                })
                .status(200)
                .json({
                    success: true,
                    message: "User logged out successfully",
                });
        } catch (err) {
            next(err);
        }
    }
}

export default AuthController;
