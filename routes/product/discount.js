const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { Discount } = new PrismaClient();
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(async (req, res) => {
    const response = await Discount.findMany({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    if (response) console.log(" response : " + JSON.stringify(response));

    res.status(200).send(response);
  })
  .post(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Discount.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    if (response) console.log(" response : " + JSON.stringify(response));

    res.status(201).send(response);
  })
  .put(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Discount.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    if (response) console.log(" response : " + JSON.stringify(response));

    res.status(201).send(response);
  })
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Discount.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    if (response) console.log(" response : " + JSON.stringify(response));

    res.status(200).send(response);
  });

module.exports = router;
