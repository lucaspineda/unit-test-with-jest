import UserList from '@/exercise-1';
import { mount } from '@vue/test-utils';
import { name } from 'faker'

test('component renders the users', async () => {
  const wrapper = mount(UserList, {
    propsData: {
      users: [name.findName(), name.findName(), name.findName()]
    }
  })
  const li = wrapper.find('li')
  const input = wrapper.find('input')
  
  expect(li.text()).toBe(wrapper.props('users')[0])

  const namePicked = wrapper.props('users')[2]

  await input.setValue(namePicked)
  expect(wrapper.find('li').text()).toBe(namePicked)
});