import fs from "fs";

const CONFIG_PATH = "config.json";

export const Config = readConfig();
export const Token = Config.BotToken;
export const Prefix = Config.Prefix;
export const Author = Config.BotAuthor;
export const DegreeType = Config.WeatherDegreeType;
export const TrackerAPIKey = Config.TrackerAPIKey;

/**
 * Reads the config.json file and returns it as JSON.
 */
function readConfig() {
  try {
    const data = fs.readFileSync(CONFIG_PATH, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return null;
  }
}
