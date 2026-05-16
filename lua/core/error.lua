-- TheRosary SDK error

local TheRosaryError = {}
TheRosaryError.__index = TheRosaryError


function TheRosaryError.new(code, msg, ctx)
  local self = setmetatable({}, TheRosaryError)
  self.is_sdk_error = true
  self.sdk = "TheRosary"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function TheRosaryError:error()
  return self.msg
end


function TheRosaryError:__tostring()
  return self.msg
end


return TheRosaryError
