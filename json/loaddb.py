import json
from pymongo import MongoClient
import codecs
import arabic_reshaper
from bidi.algorithm import get_display
# import numpy as np

# 0=id 1=sura 2=aya 3=part
quran_data = [[0,0,0],
                   [1,1,1,1], 
                   [1,1,2,1], 
                   [1,1,3,2], 
                   [1,1,4,2], 
                   [1,1,5,2], 
                   [1,1,6,3], 
                   [1,1,7,4], 
                   [6237, 6237, 6237]]
#0=sura 1=start_id 2=end_id
sura_ids = [[0,0,0],
                     [1,1,7],
                     [2,8,200]]
# Connect to the MongoDB server
client = MongoClient('mongodb://localhost:27017/')
db = client['vidly']  # Change to your database name
collection = db['movies']  # Change to your collection name
mysura = 1

with open('Quran.json', 'r', encoding='utf-8') as json_file:
    data = json.load(codecs.open('Quran.json', 'r', 'utf-8-sig'))
for i,item in enumerate(data):
    if(i == (mysura-1)):
        myid = sura_ids[mysura][0]
        array_data = item.get('array', [])
        # mysura = mysura + 1
        extracted_data = []
        for j,entry in enumerate(array_data):
            extracted_entry = {
                # 'id': entry['id'],
                'id': myid,
                'title': entry['ar'],
                'sura': mysura,
                'part': quran_data[myid][3],
                'color': 1
            }
            collection.insert_one(extracted_entry)
            myid = myid +1
            # extracted_data.append(extracted_entry)
        # collection.insert_many(extracted_data)
# Close the MongoDB connection
client.close()
