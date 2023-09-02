import json
from pymongo import MongoClient
import codecs
import arabic_reshaper
from bidi.algorithm import get_display

# Connect to the MongoDB server
client = MongoClient('mongodb://localhost:27017/')
db = client['vidly']  # Change to your database name
collection = db['movies']  # Change to your collection name
# آخرین سوره ای که ذخیره کردم:
mysura = 4 # nesa
# آخرین آی دی که در دیتابیس ذخیره شده
myid=669 #

with open('Quran.json', 'r', encoding='utf-8') as json_file:
    data = json.load(codecs.open('Quran.json', 'r', 'utf-8-sig'))
for i,item in enumerate(data):
    if(i == (mysura-1)):
    # if(True):
        array_data = item.get('array', [])
        # mysura = mysura + 1
        extracted_data = []
        for j,entry in enumerate(array_data):
            num = int(input(f"Enter a number for aya {j} of sura {mysura}:\n{get_display(entry['ar'])}\n "))
            myid = myid +1
            extracted_entry = {
                # 'id': entry['id'],
                'id': myid,
                'title': entry['ar'],
                'sura': mysura,
                'part': num,
                'color': 1
            }
            collection.insert_one(extracted_entry)
            # extracted_data.append(extracted_entry)
        # collection.insert_many(extracted_data)
# Close the MongoDB connection
client.close()
