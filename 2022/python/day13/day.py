with open("input.txt") as file:
    lines = [line.strip() for line in file.readlines()]
from functools import cmp_to_key

print(lines)
skipnext = False
pairno = 0
valids = []

def check(left, right):
    if type(left) == int and type(right) == int:
        if left < right:
            return -1
        elif left > right:
            return 1
        else:
            return 0
    elif type(left) == list and type(right) == list:
        leftLen = len(left)
        rightLen = len(right)
        res = 0
        for i in range(min(leftLen, rightLen)):
            res = check(left[i], right[i])
            if res:
                break
        if res == 0:
            if leftLen < rightLen:
                return -1
            elif rightLen < leftLen:
                return 1
            return 0
    elif type(left) == int:
        res = check([left], right)
    else:
        res = check(left, [right])
    return res

fulllist = []
for idx, x in enumerate(lines):
    if not x:
        continue
    if skipnext:
        skipnext = False
        continue

    pairno +=1
    left = x
    right = lines[idx+1]
    left = eval(left)
    right = eval(right)
    fulllist.append(left)
    fulllist.append(right)

    print("Pair No: {2} ... left: {0} ... right: {1}".format(left,right,pairno))
    valid = check(left,right)
    
    # print("left: {0} ... right: {1}".format(left,right))
    print("valid: {0}".format(valid))
    print("--------------------------------------------")
    if valid == -1:
        valids.append(pairno)
    skipnext = True

print("p1:", sum(valids))

fulllist.append([[2]])
fulllist.append([[6]])
fulllist.sort(key=cmp_to_key(check))

firstIndex = fulllist.index([[2]])+1
secondIndex = fulllist.index([[6]])+1
print("p2:", firstIndex, "*" ,secondIndex,firstIndex*secondIndex)

