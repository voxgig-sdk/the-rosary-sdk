package core

type TheRosaryError struct {
	IsTheRosaryError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewTheRosaryError(code string, msg string, ctx *Context) *TheRosaryError {
	return &TheRosaryError{
		IsTheRosaryError: true,
		Sdk:              "TheRosary",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *TheRosaryError) Error() string {
	return e.Msg
}
