import { dirname } from "node:path";
import { addPath, debug, info, setFailed } from "@actions/core";
import { inputs } from "./context";
import { install } from "./releaser";

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
