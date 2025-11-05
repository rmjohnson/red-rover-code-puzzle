import type { Node } from './types.ts';

export const getPropertiesStringFromParens = (input: string): string => {
	const firstOpenParen = input.indexOf('(');
	const lastCloseParen = input.lastIndexOf(')');

	if (firstOpenParen === -1 && lastCloseParen == -1) {
		return input;
	}

	return input.substring(firstOpenParen + 1, lastCloseParen);
};

export const childlessPropertiesStringToNodes = (input: string): ReadonlyArray<Node> => {
	return input
		.split(',')
		.map((p) => p.trim())
		.reduce((acc, name) => {
			let result = [...acc];
			if (name) {
				result = [...result, { name, children: null }];
			}

			return result;
		}, [] as ReadonlyArray<Node>);
};

export const getNumberOfCharactersInString = (
	inputString: string,
	searchCharacter: string
): number => inputString.split('').filter((c) => c === searchCharacter).length;

export const findIndexOfMatchingCloseParen = (input: string) => {
	let openParenCount = 0;
	let index = 0;
	for (const char of input.split('')) {
		if (char === '(') {
			openParenCount++;
		} else if (char === ')') {
			openParenCount--;
		}

		if (openParenCount === 0) {
			return index;
		}
		index++;
	}

	throw new Error('Could not find matching close paren.');
};

export const parse = (input: string): ReadonlyArray<Node> => {
	if (!input) {
		return [];
	}

	if (getNumberOfCharactersInString(input, '(') !== getNumberOfCharactersInString(input, ')')) {
		throw new Error(
			'The number of open parentheses `(` must equal the number of close parentheses `)`.'
		);
	}

	const propertiesString = getPropertiesStringFromParens(input);

	// Leaf node / base case
	if (!propertiesString.includes('(')) {
		return childlessPropertiesStringToNodes(propertiesString);
	}

	const result: Node[] = [];
	for (let index = 0; index < propertiesString.length; ) {
		const currentString = propertiesString.substring(index);

		const nextCommaIndex = currentString.indexOf(',');
		const property =
			nextCommaIndex === -1 ? currentString : currentString.substring(0, nextCommaIndex);

		if (property) {
			// Property with no children
			if (!property.includes('(')) {
				result.push({ name: property.trim(), children: null });
				index += property.length + 1; // + 1 for the comma
			} else {
				const indexOfChildOpenParen = property.indexOf('(');
				const propertyName = property.substring(0, indexOfChildOpenParen).trim();
				const indexOfChildCloseParen =
					indexOfChildOpenParen +
					findIndexOfMatchingCloseParen(currentString.substring(indexOfChildOpenParen));
				const children = currentString.substring(indexOfChildOpenParen, indexOfChildCloseParen + 1); // end is exclusive
				result.push({ name: propertyName, children: parse(children) });
				index += indexOfChildCloseParen + 1; // + 1 for the comma
			}
		} else {
			index++;
		}
	}

	return result;
};
