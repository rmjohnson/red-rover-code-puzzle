import { describe, expect, it } from 'vitest';
import { formatNodes } from './formatter.ts';

describe('formatter', () => {
	describe('formatNodes', () => {
		describe('sorted: false', () => {
			const sorted = false;
			it('should format an empty list as an empty string', () => {
				const result = formatNodes([], sorted);
				expect(result).toBe('');
			});

			it('should format a list of nodes with no children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{ name: 'type', children: null },
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- id
					- email
					- name
					- type
					- externalId
					"
				`);
			});

			it('should format a list of nodes with children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- id
					- email
					- name
					- type
						- id
						- name
					- externalId
					"
				`);
			});

			it('should format a list of nodes with nested children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
							{
								name: 'customFields',
								children: [
									{ name: 'c2', children: null },
									{ name: 'c1', children: null },
									{ name: 'c3', children: null },
								],
							},
						],
					},
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- id
					- email
					- name
					- type
						- id
						- name
						- customFields
							- c2
							- c1
							- c3
					- externalId
					"
				`);
			});

			it('should format a list of nodes with multiple nodes with children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
					{
						name: 'otherType',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- id
					- email
					- name
					- type
						- id
						- name
					- otherType
						- id
						- name
					- externalId
					"
				`);
			});
		});

		describe('sorted: true', () => {
			const sorted = true;
			it('should format an empty list as an empty string', () => {
				const result = formatNodes([], sorted);
				expect(result).toBe('');
			});

			it('should format a list of nodes with no children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{ name: 'type', children: null },
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- email
					- externalId
					- id
					- name
					- type
					"
				`);
			});

			it('should format a list of nodes with children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- email
					- externalId
					- id
					- name
					- type
						- id
						- name
					"
				`);
			});

			it('should format a list of nodes with nested children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
							{
								name: 'customFields',
								children: [
									{ name: 'c2', children: null },
									{ name: 'c1', children: null },
									{ name: 'c3', children: null },
								],
							},
						],
					},
					{ name: 'externalId', children: null },
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- email
					- externalId
					- id
					- name
					- type
						- customFields
							- c1
							- c2
							- c3
						- id
						- name
					"
				`);
			});

			it('should format a list of nodes with multiple nodes with children correctly', () => {
				const nodes = [
					{ name: 'id', children: null },
					{ name: 'email', children: null },
					{ name: 'name', children: null },
					{
						name: 'type',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
					{
						name: 'otherType',
						children: [
							{ name: 'id', children: null },
							{ name: 'name', children: null },
						],
					},
				];
				const result = formatNodes(nodes, sorted);
				expect(result).toMatchInlineSnapshot(`
					"- email
					- id
					- name
					- otherType
						- id
						- name
					- type
						- id
						- name
					"
				`);
			});
		});
	});
});
