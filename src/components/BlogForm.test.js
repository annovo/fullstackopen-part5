import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm /> test', () => {
  let component, form, author, title, url

  const createBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <BlogForm createBlog = {createBlog} />
    )
    form = component.container.querySelector('form')
    author = component.container.querySelector('#author')
    title = component.container.querySelector('#title')
    url = component.container.querySelector('#url')
  })

  test('form submit blog when all fields are valid', () => {
    fireEvent.change(author, {
      target: { value: 'some author' }
    })
    fireEvent.change(title, {
      target: { value: 'some title' }
    })
    fireEvent.change(url, {
      target: { value: 'someurl.com' }
    })

    fireEvent.submit(form)
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].author).toBe('some author')
  })
})