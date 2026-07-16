import { Router } from "express";
import { BlogController } from "../controllers/blog.controller";
import { authorizedMiddleware } from "../middlewares/auth.middleware";
import { blogUpload } from "../middlewares/upload.middleware";

const blogRouter = Router();
const blogController = new BlogController();

blogRouter.get("/", blogController.getAllBlogs);
blogRouter.get("/mine", authorizedMiddleware, blogController.getMyStories);
blogRouter.patch("/mine/:id", authorizedMiddleware, blogUpload.single("coverImage"), blogController.updateMyStory);
blogRouter.delete("/mine/:id", authorizedMiddleware, blogController.deleteMyStory);
blogRouter.get("/:slug", blogController.getBlogBySlug);
blogRouter.post(
  "/stories",
  authorizedMiddleware,
  blogUpload.single("coverImage"),
  blogController.submitStory,
);
blogRouter.post("/:slug/comments", authorizedMiddleware, blogController.addComment);

export default blogRouter;
