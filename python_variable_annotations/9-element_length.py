#!/usr/bin/env python3
"""Module that creates floating-point multiplier functions."""

from typing import Callable


def make_multiplier(multiplier: float) -> Callable[[float], float]:
    """Return a function that multiplies a float by multiplier."""
    def multiply(number: float) -> float:
        """Return number multiplied by the enclosing multiplier."""
        return number * multiplier

    return multiply
