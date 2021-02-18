#Here is where the database client class will be
#IMPORTANT NOTES!!!!!!
#This code is not meant to be run on its own... IT WILL NOT RUN BECAUSE OF BOTO3 CREDENTIALS 
#The idea is that the unit tests test the access patterns and mock out credentials so that it can run
#lambdas will have our credentials stored internally and will run the code when called
#TLDR dont run this code, run the tests
import os
import boto3

#Lambda lets us store this as environment variables
table_name = os.environ.get('table_name',None)

#resource and table are passed in for testing purposes because these will be mocked out
class DDBClient:

    def __init__(self,resource = None, table = None):
        #probably do not want service_resource as anything other than a temp variable
        #service_resource technically has access to the whole DDB resources on the account (which we dont need)
        service_resource = resource if resource else boto3.resource('dynamodb')
        self.table = table if table else service_resource.table(table_name)

