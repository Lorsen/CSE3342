#!/usr/bin/env python
import cgi
import json
import re

import cgitb
cgitb.enable()

print "Content-Type: text/html\r\n\r\n"

parmDict = cgi.FieldStorage()

encodedCommand = parmDict['msg'].value

def getDecodedCommand(encodedCommand):

 # matching go command
 if re.search(r'(t[0-9]+).*(meow)\D*(\d+)?\D*(\d+)?', encodedCommand):
     # actually extract tuples
     codedString = re.findall(r'(t[0-9]+).*(meow)\D*(\d+)?\D*(\d+)?', encodedCommand)
    
     decodedString = list(codedString)
     decodedString[1]='go'
        
     # convert list of tuples to string
     convertedString = (" ".join("%s %s %s %s" % tup for tup in decodedString))

 # matching stop command
 elif re.search(r'(t[0-9]+).*(nap)', encodedCommand):
    # actually extract tuples
    codedString = re.findall(r'(t[0-9]+).*(nap)', encodedCommand)
    
    decodedString = list(codedString)
    decodedString[1]='stop'
    
    # convert list of tuples to string
    convertedString =  (" ".join("%s %s" % tup for tup in inputString))

 return convertedString


for element in range(0, len(encodedCommand)):
    command = getDecodedCommand(encodedCommand)

data = {"command": command}

print data