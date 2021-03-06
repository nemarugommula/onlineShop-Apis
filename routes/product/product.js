const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
  removeIdsSuffixes,
} = require("../../middleware/utils");
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

const { Product } = new PrismaClient();
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

    const response = await Product.findMany(prismaQuery);
    if (response) console.log(" response : " + JSON.stringify(response));
    res.status(200).send(response);
  })
  .post(authenticationToken, onlyAdmin, removeIdsSuffixes, async (req, res) => {
    console.log(" before creation : " + JSON.stringify(req.body));
    const response = await Product.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));
    res.status(201).send(response);
  })
  .put(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Product.update({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });

    if (res) console.log(" response : " + JSON.stringify(response));
    res.status(201).send(response);
  })
  .delete(authenticationToken, onlyAdmin, async (req, res) => {
    const response = await Product.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    console.log(
      "------------------------------------------>>>>>" +
        JSON.stringify(response)
    );
    if (res) console.log(" response : " + JSON.stringify(response));
    res.status(200).send(response);
  });

module.exports = router;
