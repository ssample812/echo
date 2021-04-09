from db_client.db_client import DDBClient
import json
from src.db_client.exceptions import NoUserIDException

def pull_user_handler(event, context, client = None):
    event_json = json.loads(event)
    ddb_client = client if client else DDBClient()
    user_id = event_json.get('user_id',None)
    if(user_id):
        return ddb_client.pull_user_account(user_id)
    else: 
        raise NoUserIDException("No User ID in the input")