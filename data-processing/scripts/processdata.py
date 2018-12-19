#!/usr/bin/python
import math
import json
from pprint import pprint

# top left:
# ["2018-10-16T12:00:00Z", 0.0, 39.1625, 235.5625, 15.454166]
# bottom right:
# ["2018-10-16T12:00:00Z", 0.0, 35.775, 238.95, null]

# (39.1625 - 35.775)/0.0125 = 271 for height
# (238.95 - 235.5626)/0.0125 = 270.992 -> 271 for width
# to make 270 x 270, the range is from 35.775 - 39.15 for lat, 235.5625 - 238.9375 for lon

def drange(start, stop, step):
    r = start
    while r < stop:
        yield r
        r += step

with open('2018.json') as f:
    data = json.load(f)

tempData = data["table"]["rows"]

smallestLat = 35.775
largestLat = 39.15
smallestLon = 235.5625
largestLon = 238.9375
latRange = largestLat - smallestLat
lonRange = largestLon - smallestLon

latStep = latRange/10
lonStep = lonRange/10

latInterval = drange(smallestLat, largestLat, latStep)
latInc = [float("{0:.4f}".format(x)) for x in latInterval]
latInc = latInc[:-1]

lonInterval = drange(smallestLon, largestLon, lonStep)
lonInc = [float("{0:.4f}".format(x)) for x in lonInterval]

tempArray = []
for j in latInc:
    tempLonArray = []
    for k in lonInc:
        totalIntTemp = 0
        count = 0
        avgIntTemp = 0
        for i in range(len(tempData)):
            if tempData[i][2] > j and tempData[i][2] < j+1 and tempData[i][3] > k and tempData[i][3] < k+1:
                if tempData[i][4] != None and tempData[i][4] != 0:
                    count = count + 1
                    totalIntTemp = totalIntTemp + tempData[i][4]
                    
        if count != 0:
            avgIntTemp = totalIntTemp/count
        else:
            avgIntTemp = -9999
        tempLonArray.append(float("{0:.4f}".format(avgIntTemp)))
    tempArray.append(tempLonArray)
print(tempArray)
# x refers to lat, y refers to lon
# print(tempArray[9][9])
