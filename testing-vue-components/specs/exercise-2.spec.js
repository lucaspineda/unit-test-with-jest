import ExerciseForm from '@/exercise-2';
import { mount } from '@vue/test-utils';

test('follow the user through the form ', async () => {
  const wrapper = mount(ExerciseForm)

  expect(wrapper).toMatchSnapshot()

  const form = wrapper.find('form')

  const input = form.find('input')
  const taskList = wrapper.find('ul')

  input.setValue('my todo')
  await form.trigger('submit')

  expect(wrapper).toMatchSnapshot();

  input.setValue('my todo 2')
  await form.trigger('submit')

  expect(wrapper).toMatchSnapshot();

  const doneButton = taskList.find('button')
  await doneButton.trigger('click')

  expect(wrapper).toMatchSnapshot(); 
});