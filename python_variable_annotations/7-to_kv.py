#!/usr/bin/env python3
"""Module that creates a key and squared-value tuple."""

from typing import Tuple, Union


def to_kv(k: str, v: Union[int, float]) -> Tuple[str, float]:
    """Return a string key and the square of its numeric value."""
    return (k, v ** 2)
