#!/usr/bin/python

import csv
import re
import ast
import json

speciesmap = {}
firstspeciesrow = ""
with open("species_codes.csv") as codefile:
    codereader = csv.reader(codefile, delimiter=",")
    linecount = 0
    for row in codereader:
        if linecount == 0:
            linecount = linecount + 1
            firstspeciesrow = row
            continue
        group = row[3]
        speciesmap[str(row[1])] = str(group).lower()
    speciesmap["OTHER ROCKFISH YOY"] = "other rockfish"

def drange(start, stop, step):
    r = start
    while r < stop:
        yield r
        r += step

smallestLat = 35.775
largestLat = 39.15
smallestLon = 235.5625
largestLon = 238.9375
latRange = largestLat - smallestLat
lonRange = largestLon - smallestLon

latStep = latRange/10
lonStep = lonRange/10
firsthaulrow = ""
datadict = {}
with open("haul_catch_years_clean.csv") as haulfile:
    reader = csv.reader(haulfile, delimiter=",")
    firsthaulrow = next(reader, None)
    for row in reader:
        date = row[2]
        monthmatch = re.search(r'\d+', date)
        yearmatch = re.search(r'\d{4}', date)
        monthvalue = monthmatch.group()
        yearvalue = yearmatch.group()
        for i in range(3, len(row)):
            speciescodes = speciesmap[firsthaulrow[i]]
            datadict[speciescodes] = 0
        
        if monthvalue == "5" and yearvalue == "2015":
            for i in drange(smallestLat, largestLat, latStep):
                lat = ast.literal_eval(row[0])
                if lat >= i and lat < i + latStep:
                    for j in drange(smallestLon, largestLon, lonStep):
                        lon = 360-ast.literal_eval(row[1])
                        if lon >= j and lon < j + lonStep:
                            datadict["lat"] = float("{0:.4f}".format(lat))
                            datadict["lon"] = float("{0:.4f}".format(lon))
                            for k in range(3, len(row)):
                                if row[k] != '':
                                    value = ast.literal_eval(row[k])
                                    if value > 0:
                                        datadict[speciesmap[firsthaulrow[k]]] += value
                            datadictjson = json.dumps(datadict)
                            print(datadictjson, end=",\n")
