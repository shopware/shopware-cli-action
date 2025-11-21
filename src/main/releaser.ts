import { join } from "node:path";
import { debug, info } from "@actions/core";
import {
	cacheDir,
	downloadTool,
	extractTar,
} from "@actions/tool-cache";
import { osArch, osPlat } from "./context";

function getFilename() {
	let arch: string;
	switch (osArch) {
		case "x64": {
			arch = "x86_64";
			break;
		}
		case "x32": {
			arch = "i386";
			break;
		}
		case "arm": {
			arch = "arm64";
			break;
		}
		default: {
			arch = osArch;
			break;
		}
	}

	switch (osPlat) {
		case "darwin": {
			return `shopware-cli_Darwin_${arch}.tar.gz`;
		}
		default: {
			return `shopware-cli_Linux_${arch}.tar.gz`;
		}
	}
}

export async function install(version: string) {
	const filename = getFilename();
	let downloadUrl = `https://github.com/shopware/shopware-cli/releases/download/${version}/${filename}`

	if (version === 'latest') {
		downloadUrl = `https://github.com/shopware/shopware-cli/releases/latest/download/${filename}`
	}

	info(`Downloading ${downloadUrl}`);
	const downloadPath = await downloadTool(downloadUrl);
	debug(`Downloaded to ${downloadPath}`);

	info("Extracting shopware-cli");
	const extPath = await extractTar(downloadPath);
	debug(`Extracted to ${extPath}`);

	const cachePath = await cacheDir(
		extPath,
		"shopware-cli-action",
		version,
	);
	debug(`Cached to ${cachePath}`);

	const exePath = join(
		cachePath,
		`shopware-cli${osPlat === "win32" ? ".exe" : ""}`,
	);
	debug(`Exe path is ${exePath}`);

	return { bin: exePath, version: version };
}
