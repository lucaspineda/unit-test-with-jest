const { TestScheduler } = require("@jest/core");

import User from './user'

describe('User', () => {
  test('name returns full name', () => {
    const user = new User({ firstName: 'Lucas', lastName: 'Pineda' })
    expect(user.name).toBe('Lucas Pineda')
  })
})