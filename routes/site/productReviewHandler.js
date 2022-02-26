const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
} = require("../../middleware/utils");
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

const { Product_review } = new PrismaClient();

function mapUserId(req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    req.query.user_id = req.user.id;
    req.body.user_id = req.user.id;
  }
  next();
}

router.use(authenticationToken, rephraseOnlyQuery);
router
  .route("/")
  .get(async (req, res) => {
    const prismaQuery = {
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    };

    console.log(" prisma query : " + JSON.stringify(prismaQuery));
    if (req.include) prismaQuery["include"] = req.include;
    console.log(" prisma query : " + JSON.stringify(prismaQuery));

    const response = await Product_review.findMany(prismaQuery);

    console.log(" response :-------->  " + JSON.stringify(response));
    res.send(response);
  })
  .post(mapUserId, async (req, res) => {
    console.log(" ---" + JSON.stringify(req.body));
    const response = await Product_review.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .put(async (req, res) => {
    const response = await Product_review.update({
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
    const response = await Product_review.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    res.send(response);
  });

module.exports = router;
