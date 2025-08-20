import { Audit, Entity } from "../../entity";

type StubProps = {
	prop1: string;
	prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
	it('should test generation values in constructor', () => {
		const props: StubProps = {
			prop1: 'value1',
			prop2: 21,
		};

		const entity = new StubEntity(props);

		expect(entity.id).toBeTruthy();

		expect(entity.audit.createdAt).toBeTruthy();
		expect(entity.audit.createdAt).toBeInstanceOf(Date);

		expect(entity.audit.updatedAt).toBeTruthy();
		expect(entity.audit.updatedAt).toBeInstanceOf(Date);

		expect(entity.audit.deletedAt).toBeNull();
	});

	it('should set props in with method', () => {
		const props: StubProps = {
			prop1: 'value1',
			prop2: 21,
		};

		const audit: Audit = {
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: null,
		};

		const id = '25113aa4-a82a-4018-9726-ed9606afcb91';

		const entity = StubEntity.with({
			...props,
			id,
			audit,
		});

    expect(entity.id).toBe(id);
    expect(entity.audit.createdAt).toBeTruthy();
		expect(entity.audit.createdAt).toBeInstanceOf(Date);

		expect(entity.audit.updatedAt).toBeTruthy();
		expect(entity.audit.updatedAt).toBeInstanceOf(Date);

		expect(entity.audit.deletedAt).toBeNull();

    expect(entity).toBeInstanceOf(StubEntity);
	});
});
