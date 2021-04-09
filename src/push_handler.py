from db_client.db_client import DDBClient
import json
from src.db_client.exceptions import NoDataException

def push_handler(event, context, client = None):
    event_json = json.loads(event)
    ddb_client = client if client else DDBClient()
    data = event_json.get('data',None)
    if(data):
        return ddb_client.push(data)
    else: 
        raise NoDataException("No Data in the input")