 # @author Lorsen
 # January 30th, 2016
 #
 # A1 - Python
 #
 # Part A)
 #
 # Function print1ToInputFooBar( integer )
 # takes integer parameter called maxNum
 # and prints integers from 1 to maxNum,
 # except for 3 cases.
 #
 # 1) Multiples of 3 print "Foo"
 # 2) Multiples of 5 print "Bar"
 # 3) Multiples of 3 and 5 print "FooBar"

 # Part B)

 # Function getSumOfIntsFromString( str )
 # takes string parameter called testString
 # that contains both alpha characters
 # and numbers. It will extract the integers
 # from the string and return the sum.

 # Part B) Extra Credit

 # Locate all the HEX Numbers in a string of alpha characters,
 # numbers and spaces
 # and print the sum as a decimal number.

# To use string.hexdigits
import string

def print1ToInputFooBar(maxNum):
    for i in range (1, maxNum + 1):

        # Test Cases
        if i % 15 == 0:
            print ("FooBar")
        elif i % 3 == 0:
            print ("Foo")
        elif i % 5 == 0:
            print ("Bar")
        else:
            print (i)

def getSumOfIntsFromString (testString):

    # Initialize sum to 0
    sum = 0

    # get number of chars in testString
    stringSize = len(testString)
    tempString = ""  # Initialize tempString to empty

    #iterate through string, 1 character at a time
    for i in range (0, stringSize):

        # Initialize to blank char every iteration
        charToAdd = ""

        # Check if current char is alph
        if testString[i].isalpha():

            # Check if string is empty
            # If empty, set tempString to 0
            # so sum isn't affected.
            if len(tempString) == 0:
                tempString = "0"

            # If char is alpha, then convert
            # tempString to integer and add value to sum.
            sum += int(tempString)
            tempString = "" # Reset tempString

        else:

            # Char is number value
            # append to tempString
            charToAdd = testString[i]
            tempString += charToAdd

            # Case for strings ending with integers
            if i == stringSize - 1:
                sum += int(tempString)

    return sum

# Function that checks compares single character passed as parameter
# with valid hex characters, '0123456789abcdefABCDEF'
#  Returns True if a match, else False.
def isHexCharacter(testCharacter):

    if all(char in string.hexdigits for char in testCharacter):
        return True

    else:
        return False

def getSumOfHexValuesFromString (testString):

    #initialize sum to 0
    sum = 0

    # get number of chars in testString
    stringSize = len(testString)
    tempString = ""   # Initialize tempString to empty

    #iterate through string, 1 character at a time
    for i in range (0, stringSize):

        # Initialize to blank char every iteration
        charToAdd = ""

        # if valid hex character,
        # append to tempString
        if isHexCharacter(testString[i]):
            charToAdd = testString[i]
            tempString += charToAdd

            # If end of string is reached,
            # add whatever value is left into sum
            if i == stringSize - 1:
                sum += int(tempString, 16)

        else:

            # if empty string, set value to 0
            # so sum isn't affected
            if len(tempString) == 0:
                tempString = "0"

            # convert string to hex value, convert to int, and add to sum
            sum += int(tempString, 16)
            tempString = "" #reset temp string

    return sum

print1ToInputFooBar(40)

print("\n")

testCases = ["44", "abc", "123aa3z","ABC10def11xyz20"]

for i in range (0, len(testCases)):
     sumOfInts = getSumOfIntsFromString(testCases[i])
     print ("Sum of integers in " + "'" + testCases[i] +
      "'" + " is: " + str(sumOfInts))

print("\n")

hexString = "Zorro luvs dead beef do not feed zz7Fzzz4B"
sumOfHex = getSumOfHexValuesFromString(hexString)
print ("Sum of hex values in " + "'" + hexString + "' " +  "is: " +
str(sumOfHex))
