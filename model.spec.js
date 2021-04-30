import Model from './model'

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model);
});

test('model structure', () => {
  expect(new Model).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  }))
});

describe('record', () => {
  const heroes = [{ name: 'Batman' }, { name: 'Spider Man' }]

  test('can add data to the collection', () => {
    const model = new Model()
    model.record(heroes)
    expect(model.$collection).toEqual(heroes)
  });

  test('gets called when data is passed to the model', () => {
    const spy = jest.spyOn(Model.prototype, 'record')
    const model = new Model(heroes)
    expect(spy).toHaveBeenCalled();
  });
});

describe('all', () => {
  const heroes = [{ name: 'Batman' }, { name: 'Spider Man' }]

  test('returns empty model', () => {
    const model = new Model()
    expect(model.all()).toEqual([])
  });

  test('return model data', () => {
    const model = new Model(heroes)
    const returnValue = model.all(heroes)
    expect(returnValue.length).toBe(2)
  });

  test('original data stays intact', () => {
    const model = new Model([{ name: 'Batman' }])
    const returnValue = model.all(heroes)
    returnValue[0].name = 'Joker'
    expect(model.$collection[0].name).toEqual('Batman')

  });
});