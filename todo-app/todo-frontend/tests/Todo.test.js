import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Todo from '../src/Todos/Todo'

test('renders todo text and correct buttons for done todo', () => {
  const todo = {
    text: 'Test todo',
    done: true,
  }

  const { getByText } = render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)

  expect(getByText('Test todo')).toBeDefined()
  expect(getByText('This todo is done')).toBeDefined()
  expect(getByText('Delete')).toBeDefined()
})

test('renders todo text and correct buttons for not done todo', () => {
  const todo = {
    text: 'Test todo',
    done: false,
  }

  const { getByText } = render(<Todo todo={todo} onClickDelete={() => {}} onClickComplete={() => {}} />)

  expect(getByText('Test todo')).toBeDefined()
  expect(getByText('This todo is not done')).toBeDefined()
  expect(getByText('Delete')).toBeDefined()
  expect(getByText('Set as done')).toBeDefined()
})

test('calls onClickDelete and onClickComplete when buttons are clicked', () => {
  const todo = {
    text: 'Test todo',
    done: false,
  }

  const onClickDelete = jest.fn()
  const onClickComplete = jest.fn()

  const { getByText } = render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />)

  fireEvent.click(getByText('Delete'))
  expect(onClickDelete).toHaveBeenCalledWith(todo)

  fireEvent.click(getByText('Set as done'))
  expect(onClickComplete).toHaveBeenCalledWith(todo)
})