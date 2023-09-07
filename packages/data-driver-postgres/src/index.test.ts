import type { AbstractQuery } from '@directus/data';
import { randomIdentifier } from '@directus/random';
import { expect, test, describe } from 'vitest';
import DataDriverPostgres from './index.js';

// @TODO mock a database response

describe.todo('querying the driver', () => {
	test('test', async () => {
		const randomDataStore1 = randomIdentifier();
		const randomDataStore2 = randomIdentifier();
		const firstField = randomIdentifier();
		const joinField1 = randomIdentifier();
		const secondField = randomIdentifier();
		const randomCollection = randomIdentifier();
		const randomCollectionToJoin = randomIdentifier();
		const randomAliasForJoinedCollection = randomIdentifier();

		const query: AbstractQuery = {
			root: true,
			collection: randomCollection,
			store: randomDataStore1,
			nodes: [
				{
					type: 'primitive',
					field: firstField,
				},
				{
					type: 'primitive',
					field: secondField,
				},
				{
					type: 'm2o',
					nodes: [
						{
							type: 'primitive',
							field: joinField1,
						},
					],
					alias: randomAliasForJoinedCollection,
					join: {
						current: {
							fields: ['id'],
						},
						external: {
							store: randomDataStore2,
							collection: randomCollectionToJoin,
							fields: ['id'],
						},
					},
				},
			],
		};

		const driver = new DataDriverPostgres({
			connectionString: 'postgres://postgres:postgres@localhost:5432/postgres',
		});

		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const resultingStream = await driver.query(query);

		// @TODO receive all data from the stream
		const actualResult = {};

		const expectedResult = {
			firstField: 12,
			secondField: 'lorem ipsum',
			randomCollectionToJoin: {
				joinField1: 22,
			},
		};

		expect(actualResult).toEqual(expectedResult);
	});
});
