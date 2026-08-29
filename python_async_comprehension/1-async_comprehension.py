#!/usr/bin/env python3
"""Module that collects values from an asynchronous generator."""

from typing import List

async_generator = __import__("0-async_generator").async_generator


async def async_comprehension() -> List[float]:
    """Return ten random numbers using an async comprehension."""
    return [number async for number in async_generator()]
