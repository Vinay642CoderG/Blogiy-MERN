import app from "./src/app.js";
import env from "./src/config/env.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(env.PORT, () => {
  console.log(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});
