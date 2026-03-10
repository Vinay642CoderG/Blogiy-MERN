import request from "supertest";
import app from "../../src/app.js";
import { createTestUser } from "../helpers/testHelpers.js";

describe("Auth API", () => {
  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Test User",
          email: "test@example.com",
          password: "Password123!",
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.email).toBe("test@example.com");
    });

    it("should not register duplicate email", async () => {
      await request(app).post("/api/v1/auth/register").send({
        name: "User 1",
        email: "duplicate@example.com",
        password: "Password123!",
      });

      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "User 2",
          email: "duplicate@example.com",
          password: "Password123!",
        })
        .expect(400);

      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    beforeEach(async () => {
      await createTestUser({
        name: "Login User",
        email: "login@example.com",
      });
    });

    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "login@example.com",
          password: "Password123!",
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe("login@example.com");
    });

    it("should not login with invalid password", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "login@example.com",
          password: "WrongPassword",
        })
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/v1/auth/logout", () => {
    it("should logout successfully", async () => {
      const response = await request(app)
        .post("/api/v1/auth/logout")
        .expect(200);

      expect(response.body.success).toBe(true);
    });
  });

  describe("POST /api/v1/auth/refresh-token", () => {
    beforeEach(async () => {
      await createTestUser({
        name: "Refresh User",
        email: "refresh@example.com",
      });
    });

    it("should refresh token with valid refresh token", async () => {
      const loginResponse = await request(app).post("/api/v1/auth/login").send({
        email: "refresh@example.com",
        password: "Password123!",
      });

      const cookies = loginResponse.headers["set-cookie"];

      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .set("Cookie", cookies)
        .expect(200);

      expect(response.body.success).toBe(true);
    });

    it("should fail without refresh token", async () => {
      const response = await request(app)
        .post("/api/v1/auth/refresh-token")
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });
});
