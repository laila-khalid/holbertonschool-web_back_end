#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination module.
"""
import csv
from typing import List, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self) -> None:
        """Initialize the server instance."""
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict[str, Any]:
        """
        Return a dictionary with deletion-resilient pagination data.
        """
        if index is None:
            index = 0

        assert type(index) == int and 0 <= index < len(self.dataset())

        indexed_data = self.indexed_dataset()
        data = []
        current_idx = index

        while len(data) < page_size and current_idx < len(self.dataset()):
            if current_idx in indexed_data:
                data.append(indexed_data[current_idx])
            current_idx += 1

        return {
            'index': index,
            'next_index': current_idx,
            'page_size': len(data),
            'data': data
        }
