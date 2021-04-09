import json

from db_client import DDBClient
from exceptions import NoDataException


def push_handler(event, context, client=None):
    event_json = json.loads(event)
    ddb_client = client if client else DDBClient()
    data = event_json.get('data')
    if(data):
        return ddb_client.push(data)
    else:
        raise NoDataException("No Data in the input")
