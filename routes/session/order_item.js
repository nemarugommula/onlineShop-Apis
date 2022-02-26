const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { syncVariableTypesToDatabaseTypes } = require("../../middleware/utils");
const { Order_item } = new PrismaClient();
const {
  rephraseOnlyQuery,
  userOrAdmin,
  rephraseUserInQueryForOrderItemAndOrder,
} = require("../../middleware/warriers");

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(
    userOrAdmin,
    rephraseUserInQueryForOrderItemAndOrder,
    async (req, res) => {
      const response = await Order_item.findMany({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.body.query),
        },
      });

      res.status(200).send(response);
    }
  )
  .post(userOrAdmin, async (req, res) => {
    const response = await Order_item.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body.data),
      },
    });

    res.status(201).send(response);
  })
  .put(
    userOrAdmin,
    rephraseUserInQueryForOrderItemAndOrder,
    async (req, res) => {
      const response = await Order_item.update({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.body.query),
        },
        data: {
          ...syncVariableTypesToDatabaseTypes(req.body.data),
        },
      });

      res.status(201).send(response);
    }
  )
  .delete(
    userOrAdmin,
    rephraseUserInQueryForOrderItemAndOrder,
    async (req, res) => {
      const response = await Order_item.delete({
        where: {
          ...syncVariableTypesToDatabaseTypes(req.body.query),
        },
      });

      res.status(200).send(response);
    }
  );

module.exports = router;
