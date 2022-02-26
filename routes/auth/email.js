const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { filterCreation } = require("../../middleware/utils");
const { User, Profile } = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const CRYPT_LEN = 10;

//Email password authentication
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  console.log(" email : " + email + "password : " + password);
  const user = await User.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      password: true,
      role: true,
    },
  });
  if (!user)
    return res
      .status(404)
      .send({ reason: "User not found with this Email address" });
  const bool = bcrypt.compareSync(password, user.password);
  if (!bool) return res.status(403).send({ reason: "Wrong password !!" });
  const userHash = {
    id: user.id,
    role: user.role,
  };
  const accessToken = generateAccessToken(userHash);
  console.log(" accessToken : " + accessToken);
  res.send({ id: user.id, role: user.role, accessToken, status: 200 });
});

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

//Register Email
router.post("/register", filterCreation, async (req, res) => {
  const { username, password, email, first_name, last_name, mobile } = req.body;

  try {
    const hash = bcrypt.hashSync(password, CRYPT_LEN);
    const user = await User.create({
      data: {
        username,
        password: hash,
        email,
        mobile,
      },
      select: {
        id: true,
        role: true,
      },
    });

    res.status(201).send({
      status: 201,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: 400,
      reason: "some thing  went wrong",
    });
  }
});

module.exports = router;
