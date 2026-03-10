import { connectTestDB, disconnectTestDB, clearTestDB } from "./db.config.js";

// Connect to test database before all tests
beforeAll(async () => {
  await connectTestDB();
});

// Clear database after each test to ensure test isolation
afterEach(async () => {
  await clearTestDB();
});

// Disconnect from test database after all tests
afterAll(async () => {
  await disconnectTestDB();
});
