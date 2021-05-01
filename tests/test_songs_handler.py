import json
from unittest import TestCase
from unittest.mock import Mock

from src.exceptions import (BadRequestException, NoDataException,
                            NoUserIDException)
from src.songs_handler import songs_handler


class TestSongsHandler(TestCase):
    def setUp(self):
        self.mockClient = Mock()
        self.mockEvent = {'headers': {'userid': '1234', 'itemid': '1'},
            'requestContext': {'http': {'path': None, 'method': None}},
            'body': dict()}

    def test_no_userid(self):
        mock_event = {'headers': dict()}
        with self.assertRaises(NoUserIDException):
            songs_handler(mock_event, None, self.mockClient)

    def test_no_http_method_or_path(self):
        with self.assertRaises(BadRequestException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_get_success(self):
        self.mockEvent['requestContext']['http'] = {'path': '/songs',
            'method': 'GET'}
        self.mockClient.pull_user_songs.return_value = 'songs'
        self.assertEqual(songs_handler(self.mockEvent, None, self.mockClient),
            'songs')

    def test_songs_post_no_user(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs'
        self.mockEvent['requestContext']['http']['method'] = 'POST'
        self.mockClient.pull_user_account.side_effect = Mock(spec=Exception)
        with self.assertRaises(NoDataException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_user_get_success(self):
        self.mockEvent['requestContext']['http']['path'] = '/user'
        self.mockEvent['requestContext']['http']['method'] = 'GET'
        self.mockClient.pull_user_account.return_value = 'user'
        self.assertEqual(songs_handler(self.mockEvent, None, self.mockClient),
            'user')

    def test_songs_create_get_no_itemid(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'GET'
        self.mockEvent['headers']['itemid'] = None
        with self.assertRaises(BadRequestException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_create_get_success(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'GET'
        self.mockClient.pull_user_song.return_value = 'song'
        self.assertEqual(songs_handler(self.mockEvent, None, self.mockClient),
            'song')

    def test_songs_create_put_no_body(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'PUT'
        with self.assertRaises(BadRequestException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_create_put_bad_request(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'PUT'
        request_body = {'bad': 'request'}
        self.mockEvent['body'] = json.dumps(request_body)
        with self.assertRaises(BadRequestException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_create_put_dne(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'PUT'
        request_body = {'title': 'Test'}
        self.mockEvent['body'] = json.dumps(request_body)
        self.mockClient.pull_user_song.return_value = None
        with self.assertRaises(NoDataException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_create_delete_dne(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'DELETE'
        self.mockClient.delete_song.side_effect = Mock(spec=Exception)
        with self.assertRaises(NoDataException):
            songs_handler(self.mockEvent, None, self.mockClient)

    def test_songs_create_delete_success(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/create'
        self.mockEvent['requestContext']['http']['method'] = 'DELETE'
        self.mockClient.delete_song.return_value = 'deleted'
        self.assertEqual(songs_handler(self.mockEvent, None, self.mockClient),
            'deleted')
'''
    def test_songs_play_get(self):
        self.mockEvent['requestContext']['http']['path'] = '/songs/play'
        self.mockEvent['requestContext']['http']['method'] = 'GET'
        self.mockClient.pull_user_song.return_value = 'song'
        self.assertEqual(songs_handler(self.mockEvent, None, self.mockClient),
            'song')
'''