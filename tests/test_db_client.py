#Here are the tests for the db-client 
import unittest
from unittest.mock import Mock

from src.db_client import DDBClient
class DDBClientTests(unittest.TestCase):

    def setUp(self):
        mockResource = Mock()
        mockTable = Mock()
        self.test_client = DDBClient(mockResource,mockTable)
    
    def test_push(self):
        data = {"doesnt matter":"dummy data", "UserID": "hello"}
        self.test_client.table.put_item.return_value = "response"
        self.test_client.table.query.return_value = {'Items':[{'ItemID':0}]}
        res = self.test_client.push(data) 
        assert (res == "response")
        
    #Im only testing one pull function because they do the same thing :)
    def test_pull(self):
        return_data = [{"data": 1}]
        self.test_client.table.query.return_value = {'Items': return_data}
        assert(self.test_client.pull_user_account('uid') == return_data[0])
        assert(self.test_client.pull_user_songs('uid') == return_data)
