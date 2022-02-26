const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
} = require("../../middleware/utils");
const { Session } = new PrismaClient();
const {
  rephraseUserInQuery,
  userOrAdmin,
  rephraseOnlyQuery,
} = require("../../middleware/warriers");

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(
    authenticationToken,
    userOrAdmin,
    rephraseUserInQuery,
    async (req, res) => {
      const prismaQuery = {
        where: {
          ...syncVariableTypesToDatabaseTypes(req.query),
        },
      };
      if (req.include) prismaQuery["include"] = req.include;

      const response = await Session.findMany(prismaQuery);
      console.log(" response : " + JSON.stringify(response));
      res.status(200).send(response);
    }
  )
  .post(userOrAdmin, rephraseUserInQuery, async (req, res) => {
    if (req && req.body) req.body.user_id = req.user.id;
    const response = await Session.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body.data),
      },
    });

    res.status(201).send(response);
  })
  .put(userOrAdmin, rephraseUserInQuery, async (req, res) => {
    const response = await Session.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.body.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body.data),
      },
    });

    res.status(201).send(response);
  })
  .delete(userOrAdmin, rephraseUserInQuery, async (req, res) => {
    const response = await Session.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.body.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
