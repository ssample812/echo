import json

from botocore.exceptions import ClientError

from db_client import DDBClient
from exceptions import BadRequestException, NoDataException, NoUserIDException
from music import (create_blank_song, handle_update_request, rename_song,
                   update_composer)
from music_helper import m21_to_musicxml, musicxml_to_m21


def songs_handler(event, context, client=None):
    ddb_client = client if client else DDBClient()

    user_id = event.get('headers').get('userid')
    if not user_id:
        raise NoUserIDException("No UserID in the input")

    path = event.get('requestContext').get('http').get('path')
    http_method = event.get('requestContext').get('http').get('method')
    if not http_method or not path:
        raise BadRequestException('No http method or path given')

    if path == '/songs' and http_method == 'GET':
        return handle_songs_get(ddb_client, user_id)

    if path == '/songs' and http_method == 'POST':
        return handle_songs_post(ddb_client, user_id)

    item_id = event.get('headers').get('itemid')
    if not item_id:
        raise BadRequestException('No item id given')

    if path == '/songs/create' and http_method == 'GET':
        return handle_create_get(ddb_client, user_id, item_id)

    if path == '/songs/create' and http_method == 'PUT':
        try:
            escaped_body = event.get('body')
            request_body = bytes(escaped_body, "utf-8").decode("unicode_escape")
            request_dict = json.loads(request_body)
        except Exception:
            raise BadRequestException('Bad request body')
        return handle_create_put(ddb_client, user_id, item_id, request_dict)

    if path == '/songs/create' and http_method == 'DELETE':
        return handle_create_delete(ddb_client, user_id, item_id)

    if path == '/songs/play' and http_method == 'GET':
        return handle_play_get(ddb_client, user_id, item_id)


def handle_songs_get(db: DDBClient, user_id: str):
    return db.pull_user_songs(user_id)


def handle_songs_post(db: DDBClient, user_id: str):
    item_id = 1
    current_songs = db.pull_user_songs(user_id)
    if len(current_songs) > 0:
        item_id = current_songs[-1].get("ItemID") + 1

    new_song = create_blank_song()
    update_composer(user_id, new_song)
    rename_song("My Song", new_song)
    new_musicxml = m21_to_musicxml(new_song)

    item_data = {
        'MusicXml': new_musicxml,
        'ItemID': item_id,
        'UserID': user_id,
        'SongName': 'My Song'
    }
    return db.push(item_data)


def handle_create_get(db: DDBClient, user_id: str, item_id: int):
    return db.pull_user_song(user_id, item_id)


def handle_create_put(db: DDBClient, user_id: str, item_id: int, request: dict):
    if 'title' not in request and 'note' not in request:
        raise BadRequestException("Put request formatted incorrectly")

    db_response = db.pull_user_song(user_id, item_id)
    if not db_response:
        raise NoDataException("Song does not exist")
    music_xml = db_response[0].get("MusicXml")

    score = musicxml_to_m21(music_xml)
    updated_score = handle_update_request(request, score)
    updated_music_xml = m21_to_musicxml(updated_score)

    item_data = db_response[0]
    item_data["MusicXml"] = updated_music_xml
    if request.get("title"):
        item_data["SongName"] = request.get("title")
    return db.push(item_data)


def handle_create_delete(db: DDBClient, user_id: str, item_id: int):
    try:
        return db.delete_song(user_id, item_id)
    except ClientError:
        raise NoDataException("Song does not exist")


def handle_play_get(db: DDBClient, user_id: str, item_id: int):
    db.pull_user_song(user_id, item_id)
