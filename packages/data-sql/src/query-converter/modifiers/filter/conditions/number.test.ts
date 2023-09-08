import type { ConditionNumberNode } from '@directus/data';
import { randomIdentifier, randomInteger } from '@directus/random';
import { expect, test } from 'vitest';
import { parameterIndexGenerator } from '../../../param-index-generator.js';
import { convertNumberNode } from './number.js';
import type { AbstractSqlQueryConditionNode } from '../../../../index.js';

test('convert number node', () => {
	const idGen = parameterIndexGenerator();
	const randomCollection = randomIdentifier();
	const randomField = randomIdentifier();

	const con: ConditionNumberNode = {
		type: 'condition-number',
		target: {
			type: 'primitive',
			field: randomField,
		},
		operation: 'gt',
		compareTo: 6,
	};

	const expectedWhere: AbstractSqlQueryConditionNode = {
		type: 'condition',
		negate: false,
		condition: {
			type: 'condition-number',
			target: {
				type: 'primitive',
				table: randomCollection,
				column: randomField,
			},
			operation: 'gt',
			compareTo: {
				type: 'value',
				parameterIndex: 0,
			},
		},
	};

	expect(convertNumberNode(con, randomCollection, idGen, false)).toStrictEqual({
		where: expectedWhere,
		parameters: [con.compareTo],
	});
});

test('convert number node with function', () => {
	const idGen = parameterIndexGenerator();
	const randomCollection = randomIdentifier();
	const randomField = randomIdentifier();
	const randomValue = randomInteger(1, 100);

	const con: ConditionNumberNode = {
		type: 'condition-number',
		target: {
			type: 'fn',
			field: randomField,
			fn: {
				type: 'extractFn',
				fn: 'month',
			},
		},
		operation: 'gt',
		compareTo: randomValue,
	};

	const expectedWhere: AbstractSqlQueryConditionNode = {
		type: 'condition',
		condition: {
			type: 'condition-number',
			target: {
				type: 'fn',
				table: randomCollection,
				column: randomField,
				fn: {
					type: 'extractFn',
					fn: 'month',
				},
			},
			operation: 'gt',
			compareTo: {
				type: 'value',
				parameterIndex: 0,
			},
		},
		negate: false,
	};

	expect(convertNumberNode(con, randomCollection, idGen, false)).toStrictEqual({
		where: expectedWhere,
		parameters: [randomValue],
	});
});
