const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { syncVariableTypesToDatabaseTypes } = require("../../middleware/utils");
const { rephraseOnlyQuery } = require("../../middleware/warriers");

const { Campaign } = new PrismaClient();

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(async (req, res) => {
    const response = await Campaign.findMany({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    console.log(" response for campaign get : " + JSON.stringify(response));
    res.send(response);
  })
  .post(async (req, res) => {
    const response = await Campaign.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .put(async (req, res) => {
    const response = await Campaign.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    res.send(response);
  })
  .delete(async (req, res) => {
    const response = await Campaign.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    res.send(response);
  });

module.exports = router;
