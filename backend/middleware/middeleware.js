const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const cors = require("cors");

exports.usersession = session({
  secret: "votre_clef_secrete_supersecrete",
  resave: false,
  sameSite: "lax",
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
  },
});

exports.middleware = app.use(express.json());
exports.staticfiles = app.use(
  express.static(path.join(__dirname, "../public"))
);

const allowOrigin = [
  "https://n95rp9vf-5173.euw.devtunnels.ms",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowOrigin.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// exports.limiter = ratelimit({
//   window: 15 * 60 * 1000,
//   max: 10,
//   message: "too musch request",
// });

// exports.validate = async (req, res, next) => {
//   const { nom, mail, password, role } = req.body;
//   if (!nom || !mail || !password) {
//     return res
//       .status(400)
//       .json({ message: "Tous les champs sont obligatoires" });
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
//     return res.status(400).json({ message: "Format d'email invalide" });
//   }
//   if (role && role !== "admin" && role !== "users") {
//     return res
//       .status(400)
//       .json({ message: "Rôle invalide. Choisissez 'admin' ou 'users'" });
//   }
//   next();
// };

// exports.schekrole = async (req, res, next) => {
//   try {
//     const role = req.session?.role;
//     if (!role || role.toLowerCase() !== "admin") {
//       return res
//         .status(403)
//         .json({ message: "Accès réservé aux administrateurs" });
//     }
//     next();
//   } catch (error) {
//     return res.status(500).json({
//       message: "Something went wrong",
//       error: { message: error.message },
//     });
//   }
// };
