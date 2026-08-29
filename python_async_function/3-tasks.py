#!/usr/bin/env python3
"""Module that creates tasks for random-wait coroutines."""

import asyncio

wait_random = __import__("0-basic_async_syntax").wait_random


def task_wait_random(max_delay: int) -> asyncio.Task:
    """Return a task that runs the random-wait coroutine."""
    return asyncio.create_task(wait_random(max_delay))
