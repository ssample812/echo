#Here are the tests for the db-client 
import unittest
from unittest.mock import Mock

from src.db_client.db_client import DDBClient
class DDBClientTests(unittest.TestCase):

    def setUp(self):
        mockResource = Mock()
        mockTable = Mock()
        self.test_client = DDBClient(mockResource,mockTable)
    
    def test_basic(self):
        assert (1==1)
        print("Testing Works!")
        
