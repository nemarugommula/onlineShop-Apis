const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  authenticationToken,
  syncVariableTypesToDatabaseTypes,
} = require("../../middleware/utils");
const { Category } = new PrismaClient();
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

router.use(rephraseOnlyQuery);
router
  .route("/")
  .get(async (req, res) => {
    const prismaQuery = {
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    };
    if (req.include) prismaQuery["include"] = req.include;
    const response = await Category.findMany(prismaQuery);
    console.log(" response : " + JSON.stringify(response));

    res.status(200).send(response);
  })
  .post(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Category.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));

    res.status(201).send(response);
  })
  .put(authenticationToken, onlyAdmin, async (req, res) => {
    console.log(" inside put");
    const response = await Category.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));

    res.status(201).send(response);
  })
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Category.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    if (response) console.log(" response : " + JSON.stringify(response));

    res.status(200).send(response);
  });

module.exports = router;
