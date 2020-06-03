import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const mockHadler = jest.fn()

  beforeEach(() => {
    const blog = {
      author: 'Some Author',
      title: 'Some Title',
      url: 'someurl.com',
      user: {
        username: 'someuser'
      }
    }

    component = render(
      <Blog updateBlog ={mockHadler} blog = {blog}/>
    )
  })

  test('render title and author, but not likes and url', () => {
    expect(component.container).toHaveTextContent('Some Author')
    expect(component.container).toHaveTextContent('Some Title')
    expect(component.container).not.toHaveTextContent('someurl.com')
    expect(component.container).not.toHaveTextContent('likes')
  })

  test('after clicking the button url and likes are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent('url')
    expect(component.container).toHaveTextContent('likes')
  })

  test('when clicking like button 2 times function called twice', () => {
    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)
    expect(mockHadler.mock.calls).toHaveLength(2)
  })
})