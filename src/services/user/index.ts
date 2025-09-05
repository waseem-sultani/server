import type { IUserBody } from "../../utils/interfaces/user/index.js";
import userSchema from "../../schemas/user/user.schema.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const handleSignup = async (data: IUserBody) => {
  try {
    const { name, email, password } = data;
    const userFound = await userSchema.findOne({ email: email });
    if (userFound) {
      return { status: false, message: "user is already created" };
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await userSchema.create({
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
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return { status: false, message: "No user with this email." };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: false, message: "Password is incorrect." };
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1h",
      }
    );

    return token;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default { handleSignup, handleLogin };
