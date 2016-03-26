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
  if re.search(r'(t[0-9]+).*(meow)\D*(\d+)?\D*(\d+)?', encodedCommand):
      # actually extract tuples
      inputString = re.findall(r'(t[0-9]+).*(meow)\D*(\d+)?\D*(\d+)?', encodedCommand)
      # convert list of tuples to string
      convertedString = (" ".join("%s %s %s %s" % tup for tup in inputString))
      convertedString=convertedString.replace("meow", "go")
      return convertedString

  # matching stop command
  elif re.search(r'(t[0-9]+).*(nap)', encodedCommand):
     # actually extract tuples
     inputString = re.findall(r'(t[0-9]+).*(nap)', encodedCommand)
     # convert list of tuples to string
     convertedString =  (" ".join("%s %s" % tup for tup in inputString))
     convertedString=convertedString.replace("nap", "s")
     return convertedString

command = getDecodedCommand(encodedCommand)

print command
#data = {"command": command}
#
#json_data = json.dumps(data)
#
#print json_data