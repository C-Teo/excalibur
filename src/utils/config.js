import fs from "fs/promises";
import yaml from "js-yaml";

const CONFIG_PATH = "./config/config.yml";

export async function readConfig() {
	try {
		const fileContent = await fs.readFile(CONFIG_PATH, "utf8");
		return yaml.load(fileContent) || {};
	} catch (error) {
		if (error.code === "ENOENT") {
			return {};
		}
		throw error;
	}
}

export async function writeConfig(config) {
	const yamlStr = yaml.dump(config);
	await fs.writeFile(CONFIG_PATH, yamlStr, "utf8");
}
