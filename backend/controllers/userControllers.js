const argon2 = require("argon2");
const prisma = require("../config/prismaClient");
const session = require("express-session");

exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, password, address } = req.body;
    const date = new Date().getFullYear();
    const suffix = Math.floor(1 + Math.random() * 900);
    const id = `${date}tika${suffix}`;

    const hachpass = await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 2 * 12,
      timeCost: 2,
      hachLegth: 50,
      parallelism: 3,
    });

    const usercreation = await prisma.user.create({
      data: {
        id: id,
        name: name,
        phone: phone,
        email: email,
        address: address || Null,
        password: hachpass,
      },
    });
    res.status(201).json({ message: "user creat successfully", usercreation });
  } catch (error) {
    res.status(500).json({
      Message: "error during user creation",
      error: { message: error.message },
    });
  }
};
exports.connexion = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userfinder = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!userfinder) {
      return res.status(401).json({ message: "User not found" });
    }

    const compare = await argon2.verify(userfinder.password, password);

    if (compare) {
      req.session.user_id = userfinder.email;
      return res
        .status(200)
        .json({ message: "bienvenue", user: userfinder.email });
    } else {
      return res
        .status(401)
        .json({ message: "mot de passe ou  email incorrect" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error during connexion",
      error: { message: error.message },
    });
  }
};

exports.userDelete = async (req, res) => {
  async function finder(email) {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  try {
    const { email } = req.params;
    finder(email);
    if (!email) {
      res.status(204).json({
        message: "User doesn't exit !",
      });
    }
    const deleted = await prisma.user.delete({
      where: {
        email: email,
      },
    });

    res.status(202).json({
      message: "user deleted successfully",
      deleted,
    });
  } catch (error) {
    res.status(500).json({
      message: "error durring delete request",
      error: { message: error.message },
    });
  }
};

exports.logOut = async (req, res) => {
  try {
    const { user_id } = req.body;
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({
          message: "error during logout request",
          error: { message: error.message },
        });
      }
      res.clearCookie("connect.sid");
      return res
        .status(200)
        .json({ message: "Logout successful", user_id: user_id });
    });
  } catch (error) {
    res.status(500).json({
      message: "error during logout request",
      error: { message: error.message },
    });
  }
};
