import { exit } from 'process';
import { main } from './main.ts';

const printUsageAndExit = () => {
	console.error('Usage: npm start "<input string>" [sorted]');
	exit(1);
};

const args = process.argv;

// Args: node, script, input arg, sorted
if (args.length === 4) {
	if (args[3] !== 'sorted') {
		console.error(`Unrecognized parameter ${args[3]}`);
		printUsageAndExit();
	}
	const result = main(args[2], true);
	console.log(result);
} else if (args.length === 3) {
	const result = main(args[2], false);
	console.log(result);
} else {
	printUsageAndExit();
}
