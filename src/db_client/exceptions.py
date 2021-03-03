
class NoUserIDException(Exception):

    def __init__(self,message):
        self.message = message

class NoDataException(Exception):
    
    def __init__(self,message):
        self.message = message