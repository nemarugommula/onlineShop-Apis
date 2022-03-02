const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { empty } = require("@prisma/client/runtime");
const {
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

const { Inventory, ProductRelationFilter } = new PrismaClient();

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Inventory.findMany({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  })
  .post(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Inventory.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    res.status(201).send(response);
  })
  .put(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Inventory.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    res.status(201).send(response);
  })
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Inventory.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    res.status(200).send(response);
  });

module.exports = router;
