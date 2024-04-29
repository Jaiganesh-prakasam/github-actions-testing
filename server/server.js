/* server.js in root directory */
const fs = require("fs");
const path = require("path");

const dir = "/src/environments";
const file = "environment.ts";

const content = `${process.env["DEV_ENV_VARS"]}`;
const data = JSON.parse(fs.readFileSync('../.cdk/cdk.json', 'utf8'));

console.log(data);

function generateEnvironments(dir) {
  console.log(content);
  console.log(typeof content);
  fs.access(dir, fs.constants.F_OK, (err) => {
    if (err) {
      // Directory doesn't exist
      console.log("src doesn't exist, creating now");
      // Create /src
      try {
        fs.mkdirSync(dir, { recursive: true });
      } catch (error) {
        console.log(`Error while creating ${dir}. Error is ${error}`);
        process.exit(1);
      }
    }
    // Now write to file
    try {
      fs.writeFileSync(dir + "/" + file, content);
      if (fs.existsSync(dir + "/" + file)) {
        console.log("File is created", path.resolve(dir + "/" + file));
        const str = fs.readFileSync(dir + "/" + file).toString();
        console.log(str);
      }
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
}

generateEnvironments('../angular-app' + dir);
generateEnvironments('../code-ui' + dir);
