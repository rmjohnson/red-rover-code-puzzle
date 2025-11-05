import { parse } from './parser.ts';
import { formatNodes } from './formatter.ts';

export const main = (input: string, sorted: boolean) => {
	const parsedNodes = parse(input);
	const formatted = formatNodes(parsedNodes, sorted);
	return formatted;
};
