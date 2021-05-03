import TestComponent from '@/test'
import List from '@/list'
import { mount, shallowMount } from '@vue/test-utils'

test('mount', () => {
  const wrapper = mount(TestComponent, {
    propsData: {
      value: 'Another Test'
    }
  })
  expect(wrapper.html()).toMatchSnapshot()
});

test('ListComponent shallow', () => {
  console.log(mount(List).html())
  console.log(shallowMount(List).html())
});