import { describe, it, expect } from 'vitest';
import {
	findIndexOfMatchingCloseParen,
	getNumberOfCharactersInString,
	getPropertiesStringFromParens,
	parse,
	childlessPropertiesStringToNodes,
} from './parser.ts';

describe('parser', () => {
	describe('getPropertiesStringFromParens', () => {
		it.each([
			{ input: '', expected: '' },
			{ input: 'noparens', expected: 'noparens' },
			{ input: '(prop1, prop2, prop3)', expected: 'prop1, prop2, prop3' },
		])('should return $expected given $input', ({ input, expected }) => {
			const result = getPropertiesStringFromParens(input);
			expect(result).toBe(expected);
		});
	});

	describe('childlessPropertiesStringToNodes', () => {
		it.each([
			{
				input: 'a, b,   c     ',
				expected: [
					{ name: 'a', children: null },
					{ name: 'b', children: null },
					{ name: 'c', children: null },
				],
			},
			{ input: '', expected: [] },
		])('should return $expected for $input', ({ input, expected }) => {
			const result = childlessPropertiesStringToNodes(input);
			expect(result).toStrictEqual(expected);
		});
	});

	describe('getNumberOfCharactersInString', () => {
		it.each([
			{ input: '((abc))', search: '(', expected: 2 },
			{ input: '', search: ')', expected: 0 },
			{ input: 'abc', search: '(', expected: 0 },
			{ input: ')abc', search: ')', expected: 1 },
			{ input: 'abc)', search: ')', expected: 1 },
		])(
			'should return $expected given $input searching for $search',
			({ input, search, expected }) => {
				const result = getNumberOfCharactersInString(input, search);
				expect(result).toBe(expected);
			}
		);
	});

	describe('findIndexOfMatchingParenFromIndex', () => {
		it.each([
			{ input: '((ab))', expected: 5 },
			{ input: '((abc)(def))', expected: 11 },
			{ input: '(id, name)', expected: 9 },
		])('should return $expected give an input of $input', ({ input, expected }) => {
			const result = findIndexOfMatchingCloseParen(input);
			expect(result).toBe(expected);
		});
	});

	describe('parse', () => {
		it('should return an empty object for an empty string', () => {
			const result = parse('');
			expect(result).toStrictEqual([]);
		});

		it('should throw an error for an uneven number of parens', () => {
			expect(() => parse('((abc)')).toThrowErrorMatchingInlineSnapshot(
				`[Error: The number of open parentheses \`(\` must equal the number of close parentheses \`)\`.]`
			);
		});

		it('should parse a valid string input with no children', () => {
			const result = parse('(id, name, email, externalId)');
			expect(result).toMatchSnapshot();
		});

		it('should parse valid string with children', () => {
			const result = parse('(id, name, email, type(id, name), externalId)');
			expect(result).toMatchSnapshot();
		});

		it.only('should parse valid string with nested children', () => {
			const result = parse(
				'(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)'
			);
			expect(result).toMatchSnapshot();
		});

		it('should parse valid string with multiple children', () => {
			const result = parse(
				'(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId(type, value))'
			);
			expect(result).toMatchSnapshot();
		});
	});
});
