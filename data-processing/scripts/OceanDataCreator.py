
# coding: utf-8

# In[ ]:

#Given a year 2009
# we have N cells 
# Each cell contains information [{sst,wind_dir, cholorphyll, index, month, month_index}] (array is sorted by month)


# In[1]:

import math
import json
from pprint import pprint
import pandas as pd


# In[2]:

def drange(start, stop, step):
    r = start
    while r < stop:
        yield r
        r += step


# In[4]:

def readData(year):
    data = []
    filename = "../data/sst" + str(year) + '.json'
    with open(filename) as f:
        data = json.load(f)
    return data


# In[45]:

def initMatrix(yearRange):
    matrix = []
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
    
    for lat_ in latInc:
        for lon_ in lonInc:
            latRnge =[lat_,lat_+1]
            lonRnge =[lon_,lon_+1]
            cell = {'latRange': latRnge, 'lonRange': lonRnge}
            for year in yearRange:
                cell[year] = {'sst':-9999,'windDegree':0}
            matrix.append(cell)
        
    return matrix
    
# In[48]:

def processFile(year, matrix):
    sstData = readData(year)
    rows = sstData["table"]["rows"]
    for idx, cell in enumerate(matrix):
        cell = matrix[idx]
        totalIntTemp = 0
        count = 0
        avgIntTemp = 0
        for row in rows:
            lat = row[2]
            lon = row[3]
            sst = row[4]
            if((cell['latRange'][0] <= lat <= cell['latRange'][1] ) and (cell['lonRange'][0] <= lon <= cell['lonRange'][1])):
                if(sst != None and sst != 0):
                    count = count + 1
                    totalIntTemp = totalIntTemp + sst
        if count != 0:
            avgIntTemp = totalIntTemp/count
            cell[year]['sst'] = float("{0:.4f}".format(avgIntTemp))
        
    return matrix


# In[49]:
years = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]
matrix = initMatrix(years)
#run this function for all 
processFile(2009,matrix)


# In[ ]:



