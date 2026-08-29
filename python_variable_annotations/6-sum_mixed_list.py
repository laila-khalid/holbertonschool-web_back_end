#!/usr/bin/env python3
"""Module that sums a list containing integers and floats."""

from typing import List, Union


def sum_mixed_list(mxd_lst: List[Union[int, float]]) -> float:
    """Return the sum of integers and floating-point numbers in a list."""
    return sum(mxd_lst)
