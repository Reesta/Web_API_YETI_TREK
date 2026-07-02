import { Request, Response } from "express";
import { TrailService } from "../services/trail.service";
import { ApiResponseHelper } from "../uttils/apihelper.util";

const trailService = new TrailService();

export class TrailController {
  async getAllTrails(req: Request, res: Response) {
    try {
      const trails = await trailService.getAllTrails();
      return ApiResponseHelper.success(res, trails, "Trails fetched successfully");
    } catch (error: Error | any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch trails",
        error.status || 500,
      );
    }
  }

  async getTrailBySlug(req: Request, res: Response) {
    try {
      const trail = await trailService.getTrailBySlug(req.params.slug as string);
      return ApiResponseHelper.success(res, trail, "Trail fetched successfully");
    } catch (error: Error | any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch trail",
        error.status || 500,
      );
    }
  }
}
