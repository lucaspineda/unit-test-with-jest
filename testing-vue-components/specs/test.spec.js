import TestComponent from '@/test'
import List from '@/list'
import { mount, shallowMount } from '@vue/test-utils'

test('mount', () => {
  const wrapper = mount(TestComponent, {
    propsData: {
      value: 'Another Test'
    }
  })
  expect(wrapper).toMatchSnapshot()
});

test('ListComponent', () => {
  const wrapper = mount(List)
  const movies = wrapper.vm.marvelMovies
  wrapper.setData({ marvelMovies: [ ...movies, 'Endgamee' ]})
  expect(wrapper).toMatchSnapshot()
});