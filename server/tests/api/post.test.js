import request from "supertest";
import app from "../../src/app.js";
import {
  createTestUser,
  createTestAdmin,
  loginTestUser,
} from "../helpers/testHelpers.js";
import Post from "../../src/models/Post.js";
import Category from "../../src/models/Category.js";

describe("Post API", () => {
  let userToken;
  let adminToken;
  let userId;
  let postId;
  let categoryId;

  beforeEach(async () => {
    // Create regular user
    const user = await createTestUser({
      name: "Post User",
      email: "postuser@example.com",
    });
    userId = user._id;

    // Create admin user
    await createTestAdmin({
      name: "Admin User",
      email: "admin@example.com",
    });

    // Login users
    const userLogin = await loginTestUser(
      app,
      "postuser@example.com",
      "Password123!",
    );
    const adminLogin = await loginTestUser(
      app,
      "admin@example.com",
      "Password123!",
    );

    userToken = [`accessToken=${userLogin.accessToken}`];
    adminToken = [`accessToken=${adminLogin.accessToken}`];

    // Create a test category
    const category = await Category.create({ name: "Technology" });
    categoryId = category._id;

    // Create a published post
    const post = await Post.create({
      title: "Test Post",
      content: "This is test content",
      author: userId,
      category: categoryId,
      status: "published",
    });
    postId = post._id;
  });

  describe("POST /api/v1/posts (Admin Only)", () => {
    it("should create a new post as admin", async () => {
      const response = await request(app)
        .post("/api/v1/posts")
        .set("Cookie", adminToken)
        .send({
          title: "New Post",
          content: "New post content",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("New Post");
    });

    it("should create a post with category", async () => {
      const response = await request(app)
        .post("/api/v1/posts")
        .set("Cookie", adminToken)
        .send({
          title: "Tech Post",
          content: "This is tech content",
          category: categoryId.toString(),
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Tech Post");
      expect(response.body.data.category._id).toBe(categoryId.toString());
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/posts")
        .send({
          title: "New Post",
          content: "New post content",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .post("/api/v1/posts")
        .set("Cookie", userToken)
        .send({
          title: "New Post",
          content: "New post content",
        })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/posts", () => {
    it("should get all posts (public)", async () => {
      const response = await request(app).get("/api/v1/posts").expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data.docs)).toBe(true);
    });

    it("should get posts with category populated", async () => {
      const response = await request(app).get("/api/v1/posts").expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.docs[0].category).toBeDefined();
      expect(response.body.data.docs[0].category.name).toBe("Technology");
    });
  });

  describe("GET /api/v1/posts/:id (Protected)", () => {
    it("should get post by id with authentication", async () => {
      const response = await request(app)
        .get(`/api/v1/posts/${postId}`)
        .set("Cookie", userToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Test Post");
    });

    it("should get post with category populated", async () => {
      const response = await request(app)
        .get(`/api/v1/posts/${postId}`)
        .set("Cookie", userToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.category).toBeDefined();
      expect(response.body.data.category._id).toBe(categoryId.toString());
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .get(`/api/v1/posts/${postId}`)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/posts/:id (Admin Only)", () => {
    it("should update post as admin", async () => {
      const response = await request(app)
        .put(`/api/v1/posts/${postId}`)
        .set("Cookie", adminToken)
        .send({ title: "Updated Title" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe("Updated Title");
    });

    it("should update post category", async () => {
      const newCategory = await Category.create({ name: "Lifestyle" });

      const response = await request(app)
        .put(`/api/v1/posts/${postId}`)
        .set("Cookie", adminToken)
        .send({ category: newCategory._id.toString() })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.category._id).toBe(newCategory._id.toString());
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .put(`/api/v1/posts/${postId}`)
        .set("Cookie", userToken)
        .send({ title: "Updated Title" })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/posts/:id (Admin Only)", () => {
    it("should delete post as admin", async () => {
      const response = await request(app)
        .delete(`/api/v1/posts/${postId}`)
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .delete(`/api/v1/posts/${postId}`)
        .set("Cookie", userToken)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
