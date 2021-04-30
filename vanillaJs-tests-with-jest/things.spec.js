const user = {
  name: 'Lucass',
  age: 25,
  job: 'programmer',
}

test('user matches ', () => {
  expect(user).toMatchSnapshot();
});