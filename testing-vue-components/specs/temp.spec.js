import Temprature from '@/temprature'
import { mount } from '@vue/test-utils'


describe('computed', () => {
  test('celsius', () => {
    const wrapper = mount(Temprature)
    expect(wrapper.vm.celsius).toBe(0)
    // wrapper.setData({ degrees: 23 })
    wrapper.vm.degrees = 23
    expect(wrapper.vm.celsius).toBe(23)
  })

  test('fahrenheit', () => {
    const wrapper = mount(Temprature)
    expect(wrapper.vm.fahrenheit).toBe(32)
    wrapper.vm.degrees = 16
    expect(wrapper.vm.fahrenheit).toBe(60.8)
  })
})

test('temp Celsius', () => {
  const wrapper = mount(Temprature, {
    propsData: {
      temp: 40
    }
  })
  const { vm } = wrapper
  expect(vm.degrees).toBe(40)
  expect(vm.type).toBe('celsius')
});

test('temp Fahrenheit', () => {
  const wrapper = mount(Temprature, {
    propsData: {
      temp: '50f'
    }
  })
  const { vm } = wrapper
  expect(vm.degrees).toBe(50)
  expect(vm.fahrenheit).toBe(50)
  expect(vm.celsius).toBe(10)
  expect(vm.type).toBe('fahrenheit')
});

