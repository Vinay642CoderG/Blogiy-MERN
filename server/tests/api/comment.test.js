import request from "supertest";
import app from "../../src/app.js";
import { createTestUser, loginTestUser } from "../helpers/testHelpers.js";
import Post from "../../src/models/Post.js";
import Comment from "../../src/models/Comment.js";

describe("Comment API", () => {
  let userToken;
  let userId;
  let postId;
  let commentId;

  beforeEach(async () => {
    // Create user
    const user = await createTestUser({
      name: "Comment User",
      email: "commentuser@example.com",
    });
    userId = user._id;

    // Login user
    const loginData = await loginTestUser(
      app,
      "commentuser@example.com",
      "Password123!",
    );
    userToken = [`accessToken=${loginData.accessToken}`];

    // Create a post
    const post = await Post.create({
      title: "Test Post",
      content: "This is test content",
      author: userId,
      status: "published",
    });
    postId = post._id;

    // Create a comment
    const comment = await Comment.create({
      content: "Test comment",
      author: userId,
      post: postId,
    });
    commentId = comment._id;
  });

  describe("POST /api/v1/comments", () => {
    it("should create a new comment", async () => {
      const response = await request(app)
        .post("/api/v1/comments")
        .set("Cookie", userToken)
        .send({
          content: "New comment",
          postId: postId,
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe("New comment");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .post("/api/v1/comments")
        .send({
          content: "New comment",
          postId: postId,
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/comments/post/:postId", () => {
    it("should get comments for a post", async () => {
      const response = await request(app)
        .get(`/api/v1/comments/post/${postId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data.docs)).toBe(true);
    });
  });

  describe("GET /api/v1/comments/:id", () => {
    it("should get comment by id", async () => {
      const response = await request(app)
        .get(`/api/v1/comments/${commentId}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe("Test comment");
    });
  });

  describe("PUT /api/v1/comments/:id", () => {
    it("should update own comment", async () => {
      const response = await request(app)
        .put(`/api/v1/comments/${commentId}`)
        .set("Cookie", userToken)
        .send({ content: "Updated comment" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.content).toBe("Updated comment");
    });
  });

  describe("DELETE /api/v1/comments/:id", () => {
    it("should delete own comment", async () => {
      const response = await request(app)
        .delete(`/api/v1/comments/${commentId}`)
        .set("Cookie", userToken)
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });
});
