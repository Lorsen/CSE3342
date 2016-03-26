#!/usr/bin/env python
import cgi
import json
import re

import cgitb
cgitb.enable()

print "Content-type: text/html\n\n"

parmDict = cgi.FieldStorage()

encodedCommand = parmDict['msg'].value

command = ""

def getDecodedCommand(encodedCommand):

  # matching go command
  if re.search(r'(t[0-9]+).*(go)\D*(\d+)?\D*(\d+)?', encodedCommand):
      # actually extract tuples
      inputString = re.findall(r'(t[0-9]+).*(go)\D*(\d+)?\D*(\d+)?', encodedCommand)
      # convert list of tuples to string
      convertedString = (" ".join("%s %s %s %s" % tup for tup in inputString))
      return convertedString

  # matching stop command
  elif re.search(r'(t[0-9]+).*(s)', encodedCommand):
     # actually extract tuples
     inputString = re.findall(r'(t[0-9]+).*(s)', encodedCommand)
     # convert list of tuples to string
     convertedString =  (" ".join("%s %s" % tup for tup in inputString))
     return convertedString

command = getDecodedCommand(encodedCommand)

print command
#data = {"command": command}
#
#json_data = json.dumps(data)
#
#print json_data