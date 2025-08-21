import { Data } from '../../data.decorator';

interface StubClass {
	foo: string;
	num: number;
}

@Data()
class StubClass {
	props = { foo: 'bar', num: 42 };
}

describe('@Data decorator unit tests', () => {
	it('should create public getters for props', () => {
		const instance = new StubClass();
		expect(instance.foo).toBe('bar');
		expect(instance.num).toBe(42);
	});


	it('should keep properties enumerable', () => {
		const instance = new StubClass();
		expect(Object.keys(instance)).toContain('foo');
		expect(Object.keys(instance)).toContain('num');
	});
});
