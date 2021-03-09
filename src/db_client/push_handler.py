from db_client import DDBClient
import json
from exceptions import NoDataException

def push_handler(event, context, client = None):
    event_json = json.loads(event) if type(event) == 'String' else event
    ddb_client = client if client else DDBClient()
    data = event_json.get('data',None)
    if(data):
        return ddb_client.push(user_id)
    else: 
        raise NoDataException("No Data in the input")