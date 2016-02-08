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

    sum = 0




    return sum


testCases = ["mnpy4ujk6uya", "abcxyz123xyzdef"]  #return 20 , 6438

splitString = re.sub(r'[^a-f0-9A-F]'," ", testCases[1])

#ignore comments for now, attempt to find sum
#sum = sum(int(x, 16) for x in splitString if x.isdigit())
#print (str(sum))

print (splitString)

splitString = re.sub(r'[^a-f0-9A-F]', " ", testCases[0])

print ("before split function: " + splitString)

splitString.split(' ')

print("after split function: " + splitString + " - spaces still remain")
