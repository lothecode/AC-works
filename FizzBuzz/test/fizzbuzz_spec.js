var should = chai.should()

describe('Test FizzBuzz function', function () {
  // [case 1] input: 12, expect output : Fizz
  it('Integer can be devided by 3 outputs Fizz; test input: 12, expect output: Fizz', function () {
    let input = 12
    let result = fizzBuzz(input)
    let results = 'Fizz'
    result.should.be.deep.equal(results)
  })

  // [case 2]input: 20, expect output: Buzz
  it('Integer can be devided by 5 outputs Buzz; test input: 20, expect output: Buzz', function () {
    let input = 20
    let results = fizzBuzz(input)
    let result = 'Buzz'
    result.should.be.deep.equal(results)
  })

  // [case 3]input: 15, expect output: FizzBuzz
  it('Integer can be devided by both 3 & 5 outputs FizzBuz; test input: 15, expect output: FizzBuzz', function () {
    let input = 15
    let results = fizzBuzz(input)
    let result = 'FizzBuzz'
    result.should.be.deep.equal(results)
  })

  // [case 4]input: 28, expect output: 28
  it('Integer cannot be devided by 3 or 5 outputs Fizz; test input: 28, expect output: 28', function () {
    let input = 28
    let results = fizzBuzz(input)
    let result = input
    result.should.be.deep.equal(results)
  })

})