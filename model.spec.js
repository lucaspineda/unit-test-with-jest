import Model from './model'

test('new works', () => {
  expect(new Model).toBeInstanceOf(Model);
});

function createModel(data = [], options = {}){
  return new Model({
    ...options,
    data
  })
}

test('model structure', () => {
  expect(createModel()).toEqual(expect.objectContaining({
    $collection: expect.any(Array),
    $options: expect.objectContaining({
      primaryKey: 'id'
    }),
    record: expect.any(Function),
    all: expect.any(Function),
    find: expect.any(Function),
    update: expect.any(Function),
  }))
});

describe('record', () => {
  const heroes = [{ id: 1, name: 'Batman' }, { name: 'Spider Man' }]

  test('can add data to the collection', () => {
    const model = createModel()
    model.record(heroes)
    expect(model.$collection).toEqual([
      heroes[0],
      {
        id: expect.any(Number),
        name: heroes[1].name
      }
    ])
  });

  test('gets called when data is passed to the model', () => {
    const spy = jest.spyOn(Model.prototype, 'record')
    const model = createModel(heroes)
    expect(spy).toHaveBeenCalled();
  });
});

describe('all', () => {
  const heroes = [{ name: 'Batman' }, { name: 'Spider Man' }]

  test('returns empty model', () => {
    const model = createModel()
    expect(model.all()).toEqual([])
  });

  test('return model data', () => {
    const model = createModel(heroes)
    const returnValue = model.all(heroes)
    expect(returnValue.length).toBe(2)
  });

  test('original data stays intact', () => {
    const model = createModel([{ name: 'Batman' }])
    const returnValue = model.all(heroes)
    returnValue[0].name = 'Joker'
    expect(model.$collection[0].name).toEqual('Batman')

  });
});

describe('find', () => {
  const heroes = [{ id: 1, name: 'Batman' }, { name: 'Spider Man' }]

  test('returns null if nothing matches', () => {
    const model = createModel(heroes)
    expect(model.find(2)).toEqual(null)
  });

  test('returns the matching result', () => {
    const model = createModel(heroes)
    expect(model.find(1)).toEqual(heroes[0])
  });
});

describe('update', () => {
  let model;
  
  beforeEach(() => {
    const heroes = [{ id: 1, name: 'Batman' }, { name: 'Spider Man' }]
    model = createModel(heroes)
  });

  test('update an entry by Id', () => {
    model.update(1, {name: 'Joker' })
    expect(model.find(1).name).toBe('Joker')
  });

  test('extend an entry by id', () => {
    model.update(1, { cape: true })
    expect(model.find(1)).toEqual(expect.objectContaining({
      name: 'Batman',
      cape: true
    }))
  });

  test('return false if no entry matches', () => {
    expect(model.update(2)).toBe(false)
  });

});

describe('customizations', () => {
  test('we can customize the primary key', () => {
    const model = createModel([], {
      primaryKey: 'name'
    })
    expect(model.$options.primaryKey).toBe('name')
  })
});