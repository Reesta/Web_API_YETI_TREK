import { Request, Response } from "express";
import { UserMongoRepository } from "../../repositories/user.repository";
import { ApiResponseHelper } from "../../uttils/apihelper.util";

const userRepository = new UserMongoRepository();

export class AdminUserController {
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.getAll();

      const safeUsers = users.map((user) => ({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profileImage: user.profileImage || "",
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      }));

      return ApiResponseHelper.success(
        res,
        safeUsers,
        "Admin users fetched successfully",
      );
    } catch (error: Error | any) {
      return ApiResponseHelper.error(
        res,
        error.message || "Failed to fetch users",
        error.status || 500,
      );
    }
  }
}
