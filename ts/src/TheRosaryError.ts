
import { Context } from './Context'


class TheRosaryError extends Error {

  isTheRosaryError = true

  sdk = 'TheRosary'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  TheRosaryError
}

