import { Category } from "../category.entity"

describe('Category Entity', () => {
  let sut: Category

  it('should create a category with events', () => {
    const props = {
      name: 'Test Category',
      description: 'This is a test category',
      events: [
        { name: 'Event 1', operation: 'add', value: 100 },
        { name: 'Event 2', operation: 'subtract', value: 50 },
      ],
    }

    sut = Category.create(props)

    expect(sut.name).toBe('Test Category')
    expect(sut.description).toBe('This is a test category')

    expect(sut.events).toHaveLength(2)

    expect(sut.events[0].name).toBe('Event 1')
    expect(sut.events[0].operation).toBe('add')
    expect(sut.events[0].value).toBe(100)

    expect(sut.events[1].name).toBe('Event 2')
    expect(sut.events[1].operation).toBe('subtract')
    expect(sut.events[1].value).toBe(50)
  })
})
