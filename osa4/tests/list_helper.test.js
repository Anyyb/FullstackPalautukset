const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '66a769ef919d17878e31090c',
      title: 'Crispy Moroccan carrots',
      author: 'Jamie Oliver',
      url: 'jamieoliverinsivut',
      likes: 5,
      __v: 0
    },
     {
      _id: '66a76b186a13ca2ceb4743f6',
      title: 'Kuinka opin kutomaan',
      author: 'Joku Jokunen',
      url: 'Jokujokusensivut',
      likes: 10,
      __v: 0
    }
  ]

  test('When array has more than one blog return the sum of likes.', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 15)
  })
})
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '66a769ef919d17878e31090c',
      title: 'Crispy Moroccan carrots',
      author: 'Jamie Oliver',
      url: 'jamieoliverinsivut',
      likes: 5,
      __v: 0
    }
  ]

  test('When array has only one blog return that blogs likes. ', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})
test('When array is empty return 0', () => {
  const blogs = []

  const result = listHelper.totalLikes(blogs)
  assert.strictEqual(result, 0)
})
describe('favorite blog', () => {
  const listWithOneBlog = [
    {
      _id: '66a769ef919d17878e31090c',
      title: 'Crispy Moroccan carrots',
      author: 'Jamie Oliver',
      url: 'jamieoliverinsivut',
      likes: 5,
      __v: 0
    },
     {
      _id: '66a76b186a13ca2ceb4743f6',
      title: 'Kuinka opin kutomaan',
      author: 'Joku Jokunen',
      url: 'Jokujokusensivut',
      likes: 10,
      __v: 0
    }
  ]

  test('which blog in the array has most likes', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    
    assert.deepStrictEqual(result,
      {
        _id: '66a76b186a13ca2ceb4743f6',
        title: 'Kuinka opin kutomaan',
        author: 'Joku Jokunen',
        url: 'Jokujokusensivut',
        likes: 10,
        __v: 0
      }
  )
  })
})