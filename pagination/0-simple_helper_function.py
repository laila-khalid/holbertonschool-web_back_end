#!/usr/bin/env python3
"""
Simple helper function module for pagination.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
    Calculate start and end indexes for pagination parameters.
    """
    start = (page - 1) * page_size
    end = page * page_size
    return (start, end)