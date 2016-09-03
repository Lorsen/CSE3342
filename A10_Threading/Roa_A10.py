import threading



def sumOfRange(num1, num2):
    sum = 0
    for i in range (num1, num2+1):
        sum += i
    return sum

def main():

    total = sumOfRange(1,3)
    print total

main()