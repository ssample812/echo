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
        
    def test_pull_songs(self):
        return_data = [{"data": 1}]
        self.test_client.table.query.return_value = {'Items': return_data}
        assert(self.test_client.pull_user_songs('uid') == return_data)
    
    def test_pull_song(self):
        return_data = [{"data": 1}]
        self.test_client.table.query.return_value = {'Items': return_data}
        assert(self.test_client.pull_user_songs('uid') == return_data)

    def test_pull_recent_song(self):
        return_data = [{"data": 1},{"data2":2}]
        self.test_client.table.query.return_value = {'Items': return_data}
        assert(self.test_client.pull_most_recent_user_song('uid') == return_data[-1])
    
    def test_pull_account(self):
        return_data = [{"data": 1}]
        self.test_client.table.query.return_value = {'Items': return_data}
        assert(self.test_client.pull_user_account('uid') == return_data[0])

    def test_delete(self):
        response = "item_deleted"
        self.test_client.table.delete_item.return_value = response
        assert(self.test_client.delete_song('uid','iid') == response)

