# Author: Lorsen
# February 7, 2016
# Assignment A2

# A) Write a function that accepts a string as a parameter
# that contains both alpha characters and numbers.
# Extract all the HEX numbers from the string and return the sum.

# B) Write a function that decodes commands hidden in text.
# The function should take a string as a parameter and
# returns the command found in the text.
# There are two commands: s (means stop) and go (means go).
# The go command
# also has coordinates that specify the destination of the tank.

# import regular expression module
import re

def getSumOfHexValuesFromString (inputString):

    total = 0

    # search for valid groups of hex characters and insert them into a string
    inputString = re.findall(r'[a-f0-9A-F]+', inputString)

    # convert group of hex characters to base 10 representation, and add it to sum
    total = sum(int(x, 16) for x in inputString)

    return total

def getDecodedCommand(encodedCommand):

 # matching go command
 if re.search(r'(t[0-9]+).+(go)\D+(\d+)?\D+(\d+)?', encodedCommand):
     # actually extract tuples
     inputString = re.findall(r'(t[0-9]+).+(go)\D+(\d+)?\D+(\d+)?', encodedCommand)
     # convert list of tuples to string
     convertedString = (" ".join("%s %s %s %s" % tup for tup in inputString))

 # matching stop command
 elif re.search(r'(t[0-9]+).+(s)', encodedCommand):
    # actually extract tuples
    inputString = re.findall(r'(t[0-9]+).+(s)', encodedCommand)
    # convert list of tuples to string
    convertedString =  (" ".join("%s %s" % tup for tup in inputString))

 return convertedString

hexStrings = ["mnpy4ujk6uya", "abcxyz123xyzdef"]  #return 20 , 6606

for i in range (0, len(hexStrings)):
     sumOfHexValues = getSumOfHexValuesFromString(hexStrings[i])
     print ("Sum of hex values in " + "'" + hexStrings[i] +
      "'" + " is: " + str(sumOfHexValues))

encodedCommands = ["avc7fsrd5vcc12vfscsrwt1qw7eetrs&fsrsy", #return t1 s
                   #return t3 go 123 77
                   "fdjhads jhf&5672t3zcxvb,m654godjhfjdyeuyr123jfjjdjfjdf77djsfhdjhfdsf99"]

for i in range (0, len(encodedCommands)):
     decodedCommand = getDecodedCommand(encodedCommands[i])
     print("Command: " + decodedCommand)

# Output From Console:
# Sum of hex values in 'mnpy4ujk6uya' is: 20
# Sum of hex values in 'abcxyz123xyzdef' is: 6606
# Command: t1 s
# Command: t3 go 123 77