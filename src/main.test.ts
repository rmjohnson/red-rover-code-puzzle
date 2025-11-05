import { describe, it, expect } from 'vitest';
import { main } from './main.ts';

describe('main', () => {
	it('should not sort when told not to', () => {
		const input = '(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)';
		const sorted = false;
		const result = main(input, sorted);
		expect(result).toMatchInlineSnapshot(`
			"- id
			- name
			- email
			- type
				- id
				- name
				- customFields
					- c1
					- c2
					- c3
			- externalId
			"
		`);
	});

	it('should sort when told to', () => {
		const input = '(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)';
		const sorted = true;
		const result = main(input, sorted);
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
});
