const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const { syncVariableTypesToDatabaseTypes } = require("../../middleware/utils");

const { Images } = new PrismaClient();

router
  .route("/")
  .get(async (req, res) => {
    const response = await Images.findMany({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .post(async (req, res) => {
    const response = await Images.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .put(async (req, res) => {
    const response = await Images.update({
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
    const response = await Images.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    res.send(response);
  });

module.exports = router;
