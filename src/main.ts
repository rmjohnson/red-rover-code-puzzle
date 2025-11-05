const main = () => {
	const args = process.argv;
	const expectedNumberOfArguments = 3; // node, script, input arg
	if (args.length !== expectedNumberOfArguments) {
		console.error('Usage: npm start "<input string>"');
		return;
	}

	const inputString = args[2];
	console.log(`Input string: ${inputString}`);
};

main();
