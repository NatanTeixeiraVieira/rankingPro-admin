import { Audit, RootEntity } from '../../root-entity';

type StubProps = {
	prop1: string;
	prop2: number;
};

class StubRootEntity extends RootEntity<StubProps> {}

describe('RootEntity unit tests', () => {
	it('should test generation values in constructor', () => {
		const props: StubProps = {
			prop1: 'value1',
			prop2: 21,
		};

		const rootEntity = new StubRootEntity(props);

		expect(rootEntity['props'].id).toBeTruthy();

		expect(rootEntity['props'].audit.createdAt).toBeTruthy();
		expect(rootEntity['props'].audit.createdAt).toBeInstanceOf(Date);

		expect(rootEntity['props'].audit.updatedAt).toBeTruthy();
		expect(rootEntity['props'].audit.updatedAt).toBeInstanceOf(Date);

		expect(rootEntity['props'].audit.deletedAt).toBeNull();
	});

	it('should set props in with method', () => {
		const props: StubProps = {
			prop1: 'value1',
			prop2: 21,
		};

		const audit: Audit = {
			createdAt: new Date(),
			updatedAt: new Date(),
			deletedAt: new Date(),
		};

		const id = '25113aa4-a82a-4018-9726-ed9606afcb91';

		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>({
			...props,
			id,
			audit,
		});

		expect(rootEntity['props']).toStrictEqual({ ...props, id, audit });
	});

	it('should convert a rootEntity to a Javascript Object', () => {
		const props = {
			id: '25113aa4-a82a-4018-9726-ed9606afcb91',
			prop1: 'value1',
			prop2: 21,
			audit: {
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			},
		};
		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>(props);

		expect(rootEntity.toJSON()).toStrictEqual(props);
	});

	it('should mark rootEntity as deleted', () => {
		const props = {
			id: '25113aa4-a82a-4018-9726-ed9606afcb91',
			prop1: 'value1',
			prop2: 21,
			audit: {
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: null,
			},
		};

		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>(props);
		rootEntity['delete']();
		expect(rootEntity.audit.deletedAt).toBeInstanceOf(Date);
	});

	it('should update the rootEntity updatedAt', () => {
		const props = {
			id: '25113aa4-a82a-4018-9726-ed9606afcb91',
			prop1: 'value1',
			prop2: 21,
			audit: {
				createdAt: new Date(),
				updatedAt: 'new Date()' as any,
				deletedAt: new Date(),
			},
		};

		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>(props);
		rootEntity['update']();
		expect(rootEntity.audit.updatedAt).toBeInstanceOf(Date);
	});

	it('should get id (getter)', () => {
		const props = {
			id: '25113aa4-a82a-4018-9726-ed9606afcb91',
			prop1: 'value1',
			prop2: 21,
			audit: {
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			},
		};
		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>(props);

		expect(rootEntity.id).toBe(props.id);
	});

	it('should get audit (getter)', () => {
		const props = {
			id: '25113aa4-a82a-4018-9726-ed9606afcb91',
			prop1: 'value1',
			prop2: 21,
			audit: {
				createdAt: new Date(),
				updatedAt: new Date(),
				deletedAt: new Date(),
			},
		};
		const rootEntity = StubRootEntity.with<StubProps, StubRootEntity>(props);

		expect(rootEntity.audit).toStrictEqual(props.audit);

		expect(rootEntity.audit.createdAt).toBe(props.audit.createdAt);
		expect(rootEntity.audit.updatedAt).toBe(props.audit.updatedAt);
		expect(rootEntity.audit.deletedAt).toBe(props.audit.deletedAt);
	});
});
