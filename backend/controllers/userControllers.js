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
    const { user_id, password } = req.body;
    const userfinder = await prisma.user.findUnique({
      where: { mail: user_id },
    });

    if (!userfinder) {
      return res.status(401).json({ message: "User not found" });
    }

    const compare = await argon2.verify(userfinder.password, password);

    if (compare) {
      req.session.user_id = userfinder.user_id;
      return res
        .status(200)
        .json({ message: "bienvenue", user: userfinder.user_id });
    } else {
      return res
        .status(401)
        .json({ message: "mot de passe ou userId incorrect" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error during connexion",
      error: { message: error.message },
    });
  }
};

exports.userDelete = async (req, res) => {
  async function finder(user_id) {
    return await prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
    });
  }
  try {
    const { user_id } = req.params;
    finder(user_id);
    if (!user_id) {
      res.status(204).json({
        message: "User doesn't exit !",
      });
    }
    const deleted = await prisma.user.delete({
      where: {
        user_id: user_id,
      },
    });

    await logAdminAction(
      req.session.admin_id,
      "suppression utilisateur",
      `suppression utilisateur ${deleted.user_id} (${deleted.nom})`
    );

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
