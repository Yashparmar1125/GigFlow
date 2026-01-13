import DashboardService from "../services/dashboard.service.js";

class DashboardController {
  static async getDashboard(req, res, next) {
    try {
      const data = await DashboardService.getDashboardData(req.userId);

      res.status(200).json({
        success: true,
        dashboard: data,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default DashboardController;
