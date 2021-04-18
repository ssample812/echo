#Here is where the database client class will be
#IMPORTANT NOTES!!!!!!
#This code is not meant to be run on its own... IT WILL NOT RUN BECAUSE OF BOTO3 CREDENTIALS 
#The idea is that the unit tests test the access patterns and mock out credentials so that it can run
#lambdas will have our credentials stored internally and will run the code when called
#TLDR dont run this code, run the tests
import os

import boto3
from boto3.dynamodb.conditions import Key

from src.exceptions import NoUserIDException

# Lambda lets us store this as environment variables
table_name = os.environ.get('table_name')

# Resource and table are passed in for testing purposes because these will be mocked out
class DDBClient:

    def __init__(self, resource=None, table=None):
        #probably do not want service_resource as anything other than a temp variable
        #service_resource technically has access to the whole DDB resources on the account (which we dont need)
        service_resource = resource if resource else boto3.resource('dynamodb')
        self.table = table if table else service_resource.Table(table_name)

    def push(self, data):
        user_id = data.get('UserID')
        if user_id is None:
            raise NoUserIDException("No UserID")
        if data.get('ItemID') is None:
            query_result = self.table.query(KeyConditionExpression=Key('UserID').eq(user_id)).get('Items')
            recent_num = query_result[-1]['ItemID']+1 if query_result else 0
            data['ItemID'] = recent_num
        response = self.table.put_item(Item=data)
        return response

    def pull_user_songs(self, user_id):
        response = self.table.query(
            KeyConditionExpression=Key('UserID').eq(user_id) & Key('ItemID').gte(1)
        )
        return response['Items']

    def pull_user_song(self, user_id, item_id):
        response = self.table.query(
            KeyConditionExpression=Key('UserID').eq(user_id) & Key('ItemID').eq(item_id)
        )
        return response['Items']

    def pull_user_account(self, user_id):
        response = self.table.query(
            KeyConditionExpression=Key('UserID').eq(user_id) & Key('ItemID').eq(0)
        )
        return response['Items'][0]

    def delete_song(self, user_id, item_id):
        response = self.table.delete_item(Key={'UserID': user_id, 'ItemID': item_id})
        return response
