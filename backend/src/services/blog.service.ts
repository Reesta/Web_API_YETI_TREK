import { CreateBlogCommentDTO, CreateBlogDTO, SubmitStoryDTO, UpdateBlogDTO, UpdateOwnStoryDTO } from "../dtos/blog.dto";
import { HttpException } from "../exceptions/http-exception";
import { IBlog } from "../models/blog.model";
import { BlogMongoRepository } from "../repositories/blog.repository";

const blogRepository = new BlogMongoRepository();

export class BlogService {
  private toSafeBlog(blog: IBlog) {
    return {
      id: blog._id,
      userId: blog.userId,
      slug: blog.slug,
      title: blog.title,
      description: blog.description,
      content: blog.content,
      coverImage: blog.coverImage,
      category: blog.category,
      authorName: blog.authorName,
      publishDate: blog.publishDate,
      readingTime: blog.readingTime,
      status: blog.status,
      source: blog.source,
      featured: blog.featured,
      popular: blog.popular,
      relatedTrailSlugs: blog.relatedTrailSlugs,
      comments: blog.comments,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  }

  async getPublishedBlogs(filters?: { search?: string; category?: string }) {
    const blogs = await blogRepository.getPublished(filters);
    return blogs.map((blog) => this.toSafeBlog(blog));
  }

  async getPublishedBlogBySlug(slug: string) {
    const blog = await blogRepository.getBySlug(slug);
    if (!blog || blog.status !== "published") {
      throw new HttpException(404, "Blog not found");
    }
    return this.toSafeBlog(blog);
  }

  async submitStory(userId: string, storyData: SubmitStoryDTO) {
    const existingBlog = await blogRepository.getBySlug(storyData.slug);
    if (existingBlog) {
      throw new HttpException(400, "Story slug already exists");
    }

    const story = await blogRepository.create({
      ...storyData,
      userId: userId as unknown as IBlog["userId"],
      status: "pending",
      source: "user",
      category: "User Stories",
      featured: false,
      popular: false,
    });
    return this.toSafeBlog(story);
  }

  async getMyStories(userId: string, authorName: string) {
    const stories = await blogRepository.getByUser(userId, authorName);
    return stories.map((story) => this.toSafeBlog(story));
  }

  private ownsStory(blog: IBlog, userId: string, authorName: string) {
    return blog.source === "user" && (blog.userId?.toString() === userId || (!blog.userId && blog.authorName === authorName));
  }

  async updateOwnStory(userId: string, authorName: string, id: string, payload: UpdateOwnStoryDTO, coverImage?: string) {
    const blog = await blogRepository.getById(id);
    if (!blog) throw new HttpException(404, "Story not found");
    if (!this.ownsStory(blog, userId, authorName)) throw new HttpException(403, "You can edit only your own story");
    const updated = await blogRepository.update(id, { ...payload, ...(coverImage ? { coverImage } : {}), status: "pending", publishDate: undefined });
    if (!updated) throw new HttpException(404, "Story not found");
    return this.toSafeBlog(updated);
  }

  async deleteOwnStory(userId: string, authorName: string, id: string) {
    const blog = await blogRepository.getById(id);
    if (!blog) throw new HttpException(404, "Story not found");
    if (!this.ownsStory(blog, userId, authorName)) throw new HttpException(403, "You can delete only your own story");
    if (!(await blogRepository.delete(id))) throw new HttpException(404, "Story not found");
  }

  async addComment(slug: string, commentData: CreateBlogCommentDTO) {
    const blog = await blogRepository.addComment(slug, {
      ...commentData,
      createdAt: new Date(),
    });
    if (!blog) {
      throw new HttpException(404, "Blog not found");
    }
    return this.toSafeBlog(blog);
  }

  async getAdminBlogs(page: number, limit: number, search?: string, status?: string) {
    const { data, total } = await blogRepository.getAllPaginated(page, limit, search, status);

    return {
      data: data.map((blog) => this.toSafeBlog(blog)),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    };
  }

  async getAdminBlogById(id: string) {
    const blog = await blogRepository.getById(id);
    if (!blog) {
      throw new HttpException(404, "Blog not found");
    }
    return this.toSafeBlog(blog);
  }

  async createBlog(blogData: CreateBlogDTO) {
    const existingBlog = await blogRepository.getBySlug(blogData.slug);
    if (existingBlog) {
      throw new HttpException(400, "Blog slug already exists");
    }

    const blog = await blogRepository.create({
      ...blogData,
      publishDate:
        blogData.status === "published" ? blogData.publishDate || new Date() : blogData.publishDate,
    });
    return this.toSafeBlog(blog);
  }

  async updateBlog(id: string, blogData: UpdateBlogDTO) {
    const blog = await blogRepository.getById(id);
    if (!blog) {
      throw new HttpException(404, "Blog not found");
    }

    if (blogData.slug) {
      const existingBlog = await blogRepository.getBySlug(blogData.slug);
      if (existingBlog && existingBlog._id.toString() !== id) {
        throw new HttpException(400, "Blog slug already exists");
      }
    }

    const updateData = {
      ...blogData,
      ...(blogData.status === "published" && !blog.publishDate && !blogData.publishDate
        ? { publishDate: new Date() }
        : {}),
    };

    const updatedBlog = await blogRepository.update(id, updateData);
    if (!updatedBlog) {
      throw new HttpException(404, "Blog not found");
    }

    return this.toSafeBlog(updatedBlog);
  }

  async deleteBlog(id: string) {
    const deleted = await blogRepository.delete(id);
    if (!deleted) {
      throw new HttpException(404, "Blog not found");
    }
  }
}
