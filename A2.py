 # Author: Lorsen
 # February 7, 2016
 # Assignment A2
 #
 # A) Write a function that accepts a string as a parameter that contains both alpha characters and numbers.
 # Extract all the HEX numbers from the string and return the sum.__annotations__
 #
 # B) Write a function that decodes commands hidden in text. The function should take a string as a parameter and
 # returns the command found in the text. There are two commands: s (means stop) and go (means go). The go command
 # also has coordinates that specify the destination of the tank.
 #

import re

def getSumOfHexValuesFromString (inputString):

    total = 0

    inputString = re.findall(r'[a-f0-9A-F]+', inputString)

    total = sum(int(x, 16) for x in inputString)

    return total

hexStrings = ["mnpy4ujk6uya", "abcxyz123xyzdef"]  #return 20 , 6606

for i in range (0, len(hexStrings)):
     sumOfHexValues = getSumOfHexValuesFromString(hexStrings[i])
     print ("Sum of hex values in " + "'" + hexStrings[i] +
      "'" + " is: " + str(sumOfHexValues))




