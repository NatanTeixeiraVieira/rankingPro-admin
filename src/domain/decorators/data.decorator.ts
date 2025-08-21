/**
 * @Data Decorator
 *
 * Automatically generates getters/setters for all properties in the `props` object
 * of the decorated class. This eliminates boilerplate code while maintaining encapsulation.
 *
 * Usage:
 * @Data()
 * class MyClass {
 *   public readonly props: { myProp: string };
 *   // ...
 * }
 */
export function Data() {
  return <T extends { new (...args: any[]): { props: unknown } }>(
    target: T,
  ) => {
    return class extends target {
      constructor(...args: any[]) {
        super(...args);
        this.createAccessors();
      }

      /**
       * Creates accessor methods for all properties in `props`
       *
       * For each property in the `props` object:
       * - Creates a getter that returns the property value
       * - Creates a setter that updates the property value
       * - Maintains enumerable/configurable attributes
       */
      createAccessors() {
        const props = this.props as Record<string, unknown>;

        Object.keys(props).forEach((key) => {
          Object.defineProperty(this, key, {
            get: function () {
              return this.props[key];
            },
            enumerable: true,
            configurable: true,
          });
        });
      }
    };
  };
}
