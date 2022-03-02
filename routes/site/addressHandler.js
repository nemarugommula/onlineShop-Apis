const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const {
  syncVariableTypesToDatabaseTypes,
  authenticationToken,
} = require("../../middleware/utils");
const { onlyAdmin, rephraseOnlyQuery } = require("../../middleware/warriers");

const { Address } = new PrismaClient();

function mapUserId(req, res, next) {
  if (req && req.user && req.user.role == "USER") {
    req.query.user_id = req.user.id;
    req.body.user_id = req.user.id;
  }
  next();
}

async function checkAddressAlreadyCreated(product_id, user_id) {
  const Address = await Address.findMany({
    where: {
      product_id: parseInt(product_id),
      user_id: parseInt(user_id),
    },
  });

  return Address;
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

    const response = await Address.findMany(prismaQuery);

    console.log(" response :-------->  " + JSON.stringify(response));
    res.send(response);
  })
  .post(mapUserId, async (req, res) => {
    console.log(" ---" + JSON.stringify(req.body));

    const Address = await checkAddressAlreadyCreated(
      req.body.product_id,
      req.body.user_id
    );
    if (Address && Address.length && Address.length > 0) {
      return res.send(Address);
    }
    const response = await Address.create({
      data: {
        ...syncVariableTypesToDatabaseTypes(req.body),
      },
    });
    console.log(" response : " + JSON.stringify(response));
    res.send(response);
  })
  .put(async (req, res) => {
    const response = await Address.update({
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
    const response = await Address.delete({
      where: {
        ...syncVariableTypesToDatabaseTypes(req.query),
      },
    });
    res.send(response);
  });

module.exports = router;
