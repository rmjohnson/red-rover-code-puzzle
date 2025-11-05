import type { Node } from './types.ts';

export const formatNodes = (
	nodes: ReadonlyArray<Node>,
	sorted: boolean,
	indentLevel = 0
): string => {
	let result = '';
	const sortedNodes = !sorted ? nodes : [...nodes].sort((a, b) => a.name.localeCompare(b.name));
	for (const node of sortedNodes) {
		result += '\t'.repeat(indentLevel);
		result += `- ${node.name}`;
		if (node.children) {
			result += '\n';
			result += formatNodes(node.children, sorted, indentLevel + 1);
		} else {
			result += '\n';
		}
	}

	return result;
};
