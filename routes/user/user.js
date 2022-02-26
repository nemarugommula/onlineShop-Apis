const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  filterCreation,
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { User } = new PrismaClient();
const {
  onlyAdmin,
  rephraseUserInQueryForUserTable,
  userOrAdmin,
  rephraseOnlyQuery,
} = require("../../middleware/warriers");

const bcrypt = require("bcrypt");
const CRYPT_LEN = 10;

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(
    authenticationToken,
    rephraseUserInQueryForUserTable,
    async (req, res) => {
      const prismaQuery = {
        where: {
          ...syncVariableTypesToDatabaseTypes(req.query),
        },
      };
      if (req.include) prismaQuery["include"] = req.include;
      const response = await User.findMany(prismaQuery);
      console.log(" response : " + JSON.stringify(response));
      res.status(200).send(response);
    }
  )
  .post(filterCreation, async (req, res) => {
    const hash = bcrypt.hashSync(req.body.password, CRYPT_LEN);
    const response = await User.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
        password: hash,
      },
    });
    console.log(" response : --- > " + JSON.stringify(response));
    res.status(201).send(response);
  })
  .put(
    authenticationToken,
    rephraseUserInQueryForUserTable,
    async (req, res) => {
      const response = await User.update({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.query),
        },
        data: {
          ...syncVariableTypesToDatabaseTypes(req.body),
        },
      });
      console.log(" response : --- > " + JSON.stringify(response));

      res.status(200).send(response);
    }
  )
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await User.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
