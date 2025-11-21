import { dirname, join } from "node:path";
import { arch, platform } from "node:os";
import { addPath, debug, info, setFailed, getInput } from "@actions/core";
import { cacheDir, downloadTool, extractTar } from "@actions/tool-cache";

const osPlat: string = platform();
const osArch: string = arch();

function getFilename() {
	let arch: string;
	switch (osArch) {
		case "x64": {
			arch = "x86_64";
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

async function install(version: string) {
	const filename = getFilename();
	let downloadUrl = `https://github.com/shopware/shopware-cli/releases/download/${version}/${filename}`;

	if (version === "latest") {
		downloadUrl = `https://github.com/shopware/shopware-cli/releases/latest/download/${filename}`;
	}

	info(`Downloading ${downloadUrl}`);
	const downloadPath = await downloadTool(downloadUrl);
	debug(`Downloaded to ${downloadPath}`);

	info("Extracting shopware-cli");
	const extPath = await extractTar(downloadPath);
	debug(`Extracted to ${extPath}`);

	const cachePath = await cacheDir(extPath, "shopware-cli-action", version);
	debug(`Cached to ${cachePath}`);

	const exePath = join(cachePath, `shopware-cli`);
	debug(`Exe path is ${exePath}`);

	return { bin: exePath, version: version };
}

const inputs = {
	version: getInput("version") || "latest",
};

async function run() {
	try {
		const { bin, version } = await install(inputs.version);
		info(`shopware-cli ${version} installed successfully`);

		const releaser = dirname(bin);
		addPath(releaser);
		debug(`Added ${releaser} to PATH`);
	} catch (error) {
		if (error instanceof Error) {
			setFailed(error.message);
			return;
		}

		setFailed(String(error));
	}
}

run();
