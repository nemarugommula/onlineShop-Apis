const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { Order } = new PrismaClient();
const {
  onlyAdmin,
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
      const response = await Order.findMany({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.body.query),
        },
      });

      res.status(200).send(response);
    }
  )
  .post(
    authenticationToken,
    userOrAdmin,
    rephraseUserInQuery,
    async (req, res) => {
      const response = await Order.create({
        data: {
          ...syncVariableTypesToDatabaseTypes(req.body),
        },
      });

      res.status(201).send(response);
    }
  )
  .put(
    authenticationToken,
    userOrAdmin,
    rephraseUserInQuery,
    async (req, res) => {
      const response = await Order.update({
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
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Order.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
