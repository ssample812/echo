import unittest
from unittest.mock import Mock

from src.db_client.exceptions import *
from src.db_client.pull_user_handler import pull_user_handler
from src.db_client.pull_song_handler import pull_song_handler
from src.db_client.push_handler import push_handler

class DBHandlerTests(unittest.TestCase):

    def setUp(self):
        self.mockClient = Mock()
        self.test_event = '{"data":"some data","user_id":"some user"}'
        self.test_fail_event = empty_data = '{"bad":"not useful :-("}'
    
    def test_push_handler(self):
        self.mockClient.push.return_value = "PUSHED!"
        self.assertRaises(NoDataException,push_handler,test_fail_event,None,self.mockClient)
        assert(push_handler(test_event,None,self.mockClient) == "PUSHED!")
    
    def test_pull_song_handler(self):
        self.mockClient.pull_user_songs.return_value = "music"
        self.assertRaises(NoUserIDException,pull_song_handler,test_fail_event,None,self.mockClient)
        assert(pull_song_handler(test_event,None,self.mockClient) == "music")
    
    def test_pull_user_handler(self):
        self.mockClient.pull_user_songs.return_value = "user"
        self.assertRaises(NoUserIDException,pull_user_handler,test_fail_event,None,self.mockClient)
        assert(pull_user_handler(test_event,None,self.mockClient) == "user")

