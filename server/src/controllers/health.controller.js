import { collectHealthData } from "../utils/health.util.js";

export const healthCheck = async (req, res, next) => {
  try {
    const health = await collectHealthData();
    res.status(200).json(health);
  } catch (err) {
    next(err);
  }
};
