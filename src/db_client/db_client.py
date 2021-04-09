#Here is where the database client class will be
#IMPORTANT NOTES!!!!!!
#This code is not meant to be run on its own... IT WILL NOT RUN BECAUSE OF BOTO3 CREDENTIALS 
#The idea is that the unit tests test the access patterns and mock out credentials so that it can run
#lambdas will have our credentials stored internally and will run the code when called
#TLDR dont run this code, run the tests
import os
import boto3
from boto3.dynamodb.conditions import Key
from exceptions import NoUserIDException

#Lambda lets us store this as environment variables
table_name = os.environ.get('table_name',None)

#resource and table are passed in for testing purposes because these will be mocked out
class DDBClient:

    def __init__(self, resource = None, table = None):
        #probably do not want service_resource as anything other than a temp variable
        #service_resource technically has access to the whole DDB resources on the account (which we dont need)
        service_resource = resource if resource else boto3.resource('dynamodb')
        self.table = table if table else service_resource.Table(table_name)
    
    def push(self, data):
        user_id = data.get('UserName')
        if user_id is not None:
            raise NoUserIDException
        query_result = self.table.query(KeyConditionExpression=Key('UserName').eq(user_id)).get('Items')
        recent_num = query_result[-1]['ItemCount']+1 if query_result else 0
        data['ItemCount'] = recent_num
        response = self.table.put_item(Item=data)
        return response
    
    def pull_user_songs(self, user_id):
        response = self.table.query(
        KeyConditionExpression=
            Key('UserName').eq(user_id)
        )
        return response['Items'][1:]

    def pull_user_account(self, user_id):
        response = self.table.query(
        KeyConditionExpression=
            Key('UserName').eq(user_id)
        )
        return response['Items'][0]
    
    def pull_one_song(self, user_id, song_id):
        response = self.table.query(
            IndexName = "SongTitile-Index"
            KeyConditionExpression = 
                Key('SongTitle').eq(song_id)
        )
        items = response.get['Items']
        if len(items) < 2:
            return items
        for item in items:
            if item['UserName'] == user_id:
                return item


