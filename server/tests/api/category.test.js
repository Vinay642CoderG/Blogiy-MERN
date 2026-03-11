import request from "supertest";
import app from "../../src/app.js";
import { createTestAdmin, loginTestUser } from "../helpers/testHelpers.js";
import Category from "../../src/models/Category.js";
import Post from "../../src/models/Post.js";

describe("Category API", () => {
  let adminToken;
  let categoryId;

  beforeEach(async () => {
    // Create admin user
    await createTestAdmin({
      name: "Admin User",
      email: "admin@example.com",
    });

    // Login admin
    const adminLogin = await loginTestUser(
      app,
      "admin@example.com",
      "Password123!",
    );

    adminToken = [`accessToken=${adminLogin.accessToken}`];

    // Create a test category
    const category = await Category.create({ name: "Technology" });
    categoryId = category._id;
  });

  describe("POST /api/v1/categories (Admin Only)", () => {
    it("should create a new category as admin", async () => {
      const response = await request(app)
        .post("/api/v1/categories")
        .set("Cookie", adminToken)
        .send({
          name: "Travel",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Travel");
    });

    it("should fail if category name already exists", async () => {
      const response = await request(app)
        .post("/api/v1/categories")
        .set("Cookie", adminToken)
        .send({
          name: "Technology",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/categories")
        .send({
          name: "Travel",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/categories", () => {
    it("should get all categories (public)", async () => {
      const response = await request(app).get("/api/v1/categories").expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
    });

    it("should search categories by name", async () => {
      const response = await request(app)
        .get("/api/v1/categories?search=Tech")
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0].name).toContain("Tech");
    });
  });

  describe("GET /api/v1/categories/:id", () => {
    it("should get category by id (public)", async () => {
      const response = await request(app)
        .get(`/api/v1/categories/${categoryId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data._id).toBe(categoryId.toString());
      expect(response.body.data.name).toBe("Technology");
    });

    it("should return 404 for non-existent category", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .get(`/api/v1/categories/${fakeId}`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/categories/:id (Admin Only)", () => {
    it("should update category as admin", async () => {
      const response = await request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .set("Cookie", adminToken)
        .send({ name: "Tech & Science" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Tech & Science");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .send({ name: "Tech & Science" })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/categories/:id (Admin Only)", () => {
    it("should delete category as admin", async () => {
      const response = await request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should fail to delete category with posts", async () => {
      // Create a post with this category
      const user = await createTestAdmin({
        name: "Post Author",
        email: "author@example.com",
      });

      await Post.create({
        title: "Test Post",
        content: "This is test content",
        author: user._id,
        category: categoryId,
        status: "published",
      });

      const response = await request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set("Cookie", adminToken)
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/categories/:categoryId/posts", () => {
    it("should get posts by category", async () => {
      // Create a user and post
      const user = await createTestAdmin({
        name: "Post Author",
        email: "author@example.com",
      });

      await Post.create({
        title: "Tech Post 1",
        content: "This is tech content",
        author: user._id,
        category: categoryId,
        status: "published",
      });

      const response = await request(app)
        .get(`/api/v1/categories/${categoryId}/posts`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.category._id).toBe(categoryId.toString());
      expect(response.body.data.posts.docs.length).toBeGreaterThan(0);
    });

    it("should return 404 for non-existent category", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .get(`/api/v1/categories/${fakeId}/posts`)
        .expect(404);

      expect(response.body.success).toBe(false);
    });

    it("should paginate posts by category", async () => {
      const user = await createTestAdmin({
        name: "Post Author",
        email: "author@example.com",
      });

      // Create multiple posts
      for (let i = 0; i < 15; i++) {
        await Post.create({
          title: `Tech Post ${i}`,
          content: "This is tech content",
          author: user._id,
          category: categoryId,
          status: "published",
        });
      }

      const response = await request(app)
        .get(`/api/v1/categories/${categoryId}/posts?page=1&limit=10`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.posts.docs.length).toBe(10);
      expect(response.body.data.posts.totalPages).toBeGreaterThan(1);
    });
  });
});
