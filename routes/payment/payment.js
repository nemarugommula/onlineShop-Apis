const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { Payment } = new PrismaClient();
const {
  onlyAdmin,
  rephraseUserInQueryForPaymnentAndOrder,
  userOrAdmin,
  rephraseOnlyQuery,
} = require("../../middleware/warriers");

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(
    authenticationToken,
    userOrAdmin,
    rephraseUserInQueryForPaymnentAndOrder,
    async (req, res) => {
      const response = await Payment.findMany({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.query),
        },
      });

      res.status(200).send(response);
    }
  )
  .post(userOrAdmin, async (req, res) => {
    const response = await Payment.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    res.status(201).send(response);
  })
  .put(
    userOrAdmin,
    rephraseUserInQueryForPaymnentAndOrder,
    async (req, res) => {
      const response = await Payment.update({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.query),
        },
        data: {
          ...syncVariableTypesToDatabaseTypes(req.body),
        },
      });

      res.status(201).send(response);
    }
  )
  .delete(onlyAdmin, async (req, res) => {
    const response = await Payment.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
