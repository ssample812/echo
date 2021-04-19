from src.db_client import DDBClient
from src.exceptions import (BadRequestException, NoUserIDException)

def push_account_handler(event, context, client=None):
    db = client if client else DDBClient()

    user_id = event.get('request').get('userAttributes').get('sub')
    if not user_id:
        raise NoUserIDException("No UserID in the input")

    nickname = event.get('request').get('userAttributes').get('nickname')
    if not nickname:
        raise BadRequestException("Request body missing nickname")

    item_data = {
        'UserID': user_id,
        'Nickname': nickname
    }
    
    response = db.push(item_data)
    if not response:
        raise BadRequestException(response)
    return event
