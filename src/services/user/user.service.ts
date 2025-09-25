import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../schemas/user/user.schema.js";
import type { IUserBody } from "../../interfaces/index.js";

const handleSignup = async (data: IUserBody) => {
  try {
    const { name, email, password } = data;
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return { status: false, message: "user is already created" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    return { status: true, message: "user is created" };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const handleLogin = async (data: IUserBody) => {
  try {
    const { email, password } = data;
    const user = await User.findOne({ email: email });
    if (!user) {
      return {
        status: false,
        reason: "email",
        message: "No user with this email.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return {
        status: false,
        reason: "password",
        message: "Password is incorrect.",
      };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "50d",
      }
    );

    return { status: true, token, user };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllUsers = async (id: string) => {
  const users = await User.find({ _id: { $ne: id } }).select("-password");
  return users;
};

export default { handleSignup, handleLogin, getAllUsers };
