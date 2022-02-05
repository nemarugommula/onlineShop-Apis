const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const { User } = new PrismaClient();

router.post("/", async(req, res) => {
  const result = await createUser(req.body);
  res.status(result.status).send(result);
});

const createUser = async ({ username, password, email, mobile }) => {
  let result = {};
  try {
    const response = await User.create({
      data: {
        username,
        password,
        email,
        mobile,
      },
      select: {
        username: true,
        email: true,
        mobile: true,
      },
    });
    result = {...response,status:'201'};
  } catch (err) {
     result = {status:'400',message:'unable to create user'}
  }
  return result;
};



router.get('/',async (req,res)=>{
    const response = await User.findMany();
    res.send(response);
});


module.exports = router;
