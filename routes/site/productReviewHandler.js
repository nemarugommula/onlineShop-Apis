const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
} = require("../../middleware/utils");

const { Product_review } = new PrismaClient();

function mapUserId(req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    req.query.user_id = req.user.id;
  }
  next();
}

router.use(authenticationToken);
router
  .route("/")
  .get(async (req, res) => {
    const response = await Product_review.findMany({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });

    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .post(mapUserId, async (req, res) => {
    console.log(" ---");
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
