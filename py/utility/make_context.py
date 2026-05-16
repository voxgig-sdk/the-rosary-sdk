# TheRosary SDK utility: make_context

from core.context import TheRosaryContext


def make_context_util(ctxmap, basectx):
    return TheRosaryContext(ctxmap, basectx)
