import request from "supertest";
import app from "../../src/app.js";
import {
  createTestUser,
  createTestAdmin,
  loginTestUser,
} from "../helpers/testHelpers.js";

describe("User API", () => {
  let userToken;
  let adminToken;
  let userId;

  beforeEach(async () => {
    // Create regular user
    const user = await createTestUser({
      name: "Regular User",
      email: "user@example.com",
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
      "user@example.com",
      "Password123!",
    );
    const adminLogin = await loginTestUser(
      app,
      "admin@example.com",
      "Password123!",
    );

    userToken = [`accessToken=${userLogin.accessToken}`];
    adminToken = [`accessToken=${adminLogin.accessToken}`];
  });

  describe("GET /api/v1/users/profile/me", () => {
    it("should get own profile", async () => {
      const response = await request(app)
        .get("/api/v1/users/profile/me")
        .set("Cookie", userToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("user@example.com");
    });

    it("should fail without authentication", async () => {
      const response = await request(app)
        .get("/api/v1/users/profile/me")
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/users/profile/me", () => {
    it("should update own profile", async () => {
      const response = await request(app)
        .put("/api/v1/users/profile/me")
        .set("Cookie", userToken)
        .send({ name: "Updated Name" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Updated Name");
    });

    it("should update password", async () => {
      const response = await request(app)
        .put("/api/v1/users/profile/me")
        .set("Cookie", userToken)
        .send({
          password: "NewPassword123!",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should update email if not already taken", async () => {
      const response = await request(app)
        .put("/api/v1/users/profile/me")
        .set("Cookie", userToken)
        .send({ email: "newemail@example.com" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("newemail@example.com");
    });

    it("should fail to update email if already taken", async () => {
      const response = await request(app)
        .put("/api/v1/users/profile/me")
        .set("Cookie", userToken)
        .send({ email: "admin@example.com" })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already registered");
    });
  });

  describe("POST /api/v1/users (Admin Only)", () => {
    it("should create user as admin", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Cookie", adminToken)
        .send({
          name: "New User",
          email: "newuser@example.com",
          password: "Password123!",
          role: "user",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("New User");
      expect(response.body.data.email).toBe("newuser@example.com");
      expect(response.body.data.role).toBe("user");
    });

    it("should fail to create user with existing email", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Cookie", adminToken)
        .send({
          name: "Duplicate User",
          email: "user@example.com", // Already exists
          password: "Password123!",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already registered");
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .post("/api/v1/users")
        .set("Cookie", userToken)
        .send({
          name: "Hacker User",
          email: "hacker@example.com",
          password: "Password123!",
        })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/users (Admin Only)", () => {
    it("should get all users as admin", async () => {
      const response = await request(app)
        .get("/api/v1/users")
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.docs).toBeDefined();
      expect(Array.isArray(response.body.data.docs)).toBe(true);
    });

    it("should support pagination", async () => {
      const response = await request(app)
        .get("/api/v1/users?page=1&limit=1")
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.limit).toBe(1);
      expect(response.body.data.page).toBe(1);
    });

    it("should support search by name", async () => {
      const response = await request(app)
        .get("/api/v1/users?search=Regular")
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should support role filtering", async () => {
      const response = await request(app)
        .get("/api/v1/users?role=admin")
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .get("/api/v1/users")
        .set("Cookie", userToken)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/v1/users/:id (Admin Only)", () => {
    it("should get user by id as admin", async () => {
      const response = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("user@example.com");
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .get(`/api/v1/users/${fakeId}`)
        .set("Cookie", adminToken)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found");
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .get(`/api/v1/users/${userId}`)
        .set("Cookie", userToken)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("PUT /api/v1/users/:id (Admin Only)", () => {
    it("should update user as admin", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .send({ name: "Admin Updated" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe("Admin Updated");
    });

    it("should update user password as admin", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .send({ password: "NewAdminPassword123!" })
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should update user role as admin", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .send({ role: "admin" })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.role).toBe("admin");
    });

    it("should fail to update with existing email", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .send({ email: "admin@example.com" })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email already registered");
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .put(`/api/v1/users/${fakeId}`)
        .set("Cookie", adminToken)
        .send({ name: "Non-existent" })
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found");
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .put(`/api/v1/users/${userId}`)
        .set("Cookie", userToken)
        .send({ name: "Hacker" })
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe("DELETE /api/v1/users/:id (Admin Only)", () => {
    let adminUserId;

    beforeEach(async () => {
      // Get admin user ID for self-deletion test
      const adminUser = await request(app)
        .get("/api/v1/users/profile/me")
        .set("Cookie", adminToken);
      adminUserId = adminUser.body.data._id;
    });

    it("should delete user as admin", async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set("Cookie", adminToken)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User deleted successfully");
    });

    it("should prevent admin from deleting themselves", async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${adminUserId}`)
        .set("Cookie", adminToken)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("You cannot delete your own account");
    });

    it("should return 404 for non-existent user", async () => {
      const fakeId = "507f1f77bcf86cd799439011";
      const response = await request(app)
        .delete(`/api/v1/users/${fakeId}`)
        .set("Cookie", adminToken)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found");
    });

    it("should deny regular user access", async () => {
      const response = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set("Cookie", userToken)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});
