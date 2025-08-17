import {
  BaseProps,
  ConstructorEntityProps,
  EntityProps,
  RootEntity,
} from './root-entity';

/**
 * Type representing the audit properties of an entity.
 * It includes the creation, update, and deletion (soft delete) dates.
 */
export type Audit = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export abstract class Entity<Props extends BaseProps> {
  id: string;
  audit: Audit;

  constructor(props: Props & ConstructorEntityProps) {
    Object.assign(this, {
      ...props,
      id: props.id ?? crypto.randomUUID().toString(),
      audit: {
        createdAt: props.audit?.createdAt ?? new Date(),
        updatedAt: props.audit?.updatedAt ?? new Date(),
        deletedAt: props.audit?.deletedAt ?? null,
      },
    });
  }

  /**
   * Static method that creates instances of a subclass of `Entity` using the provided properties.
   * This method can be used by any subclass of `Entity` to create new instances.
   *
   * **Warning:** This method is the recommended way to instantiate a subclass of `Entity`, or an appropriated method.
   * Avoid using the constructor directly.
   *
   * @param {Props & EntityProps} props - The properties required to create the entity instance.
   * @returns {Ent} - A new instance of the subclass, created with the provided properties.
   *
   * @this {new (props: Props & EntityProps) => Ent} - The constructor of the subclass that calls this method.
   */
  static with<Props extends BaseProps, Ent extends RootEntity<Props>>(
    this: new (props: Props & EntityProps) => Ent,
    props: Props & EntityProps,
  ): Ent {
    // biome-ignore lint/complexity/noThisInStatic: Using `this` in a static method to dynamically reference the subclass constructor and create instances.
    return new this(props);
  }
}
