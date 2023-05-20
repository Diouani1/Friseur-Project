import creatErr from "http-errors";
import Receipt from "../../models/Receipt.js";

// # get the receipt

const getEmployerReceipt = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    const receipts = await Receipt.find({
      employer: req.params.id,
      createdAt: { $gte: startDate, $lte: endDate },
    }).populate("employer", "fullName");

    res.send(receipts);
  } catch (error) {
    next(creatErr(401, error));
  }
};
export { getEmployerReceipt };
