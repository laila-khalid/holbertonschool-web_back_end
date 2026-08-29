#!/usr/bin/env python3
"""Module that returns iterable elements with their lengths."""

from typing import Iterable, List, Sequence, Tuple


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """Return each sequence in an iterable together with its length."""
    return [(item, len(item)) for item in lst]
