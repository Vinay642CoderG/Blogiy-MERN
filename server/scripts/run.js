import path from "path";
import { pathToFileURL } from "url";

const scriptName = process.argv[2];

if (!scriptName) {
  console.log("Please provide a script name");
  console.log("Example: npm run script create-admin");
  process.exit(1);
}

const scriptPath = path.resolve(`scripts/${scriptName}.js`);
const scriptUrl = pathToFileURL(scriptPath).href;

try {
  await import(scriptUrl);
} catch (error) {
  console.error(`Script "${scriptName}" not found`);
  console.error(error);
  process.exit(1);
}
