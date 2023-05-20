import creatErr from "http-errors";
import Receipt from "../../models/Receipt.js";

// # add a new receipt
const addReceipt = async (req, res, next) => {
  try {
    const receipt = await Receipt.create(req.body);
    res.send(receipt);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { addReceipt };
