import test from 'ava'
import * as util from '../../source/util'

test('capitalizeWords capitalizes first letter of given word', t => {
  const actual = util.capitalizeWords('hello')
  t.is(actual, 'Hello')
})

test('capitalizeWords capitalizes first letter of all given words', t => {
  const actual = util.capitalizeWords('hello world')
  t.is(actual, 'Hello World')
})

test('capitalizeWords returns an empty string when given an empty string', t => {
  const input = ''
  const actual = util.capitalizeWords('')
  t.is(actual, input)
})
