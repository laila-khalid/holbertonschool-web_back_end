#!/usr/bin/env python3
"""Simple helper function for pagination."""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Return a tuple of start and end indexes for pagination."""
    return ((page - 1) * page_size, page * page_size)