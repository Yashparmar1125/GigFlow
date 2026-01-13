import User from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";

class AuthService {
  //register user
  static async register({ name, email, password }) {
    if (!name || !email || !password) {
      throw {
        status: 400,
        message: "All fields required",
      };
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw {
        status: 409,
        message: "User already exists",
      };
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return {
      user,
      token,
    };
  }

  static async Me(userId) {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }
    return user;
  }
  

  //login user
  static async Login({ email, password }) {
    if (!email || !password) {
      throw {
        status: 400,
        message: "All fields required",
      };
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      throw {
        status: 401,
        message: "Invalid credentials",
      };
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw {
        status: 401,
        message: "Invalid credentials",
      };
    }
    const token = generateToken(user._id);
    return {
      user,
      token,
    };
  }

  
}

export default AuthService;
