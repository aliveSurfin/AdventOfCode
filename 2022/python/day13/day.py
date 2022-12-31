with open("input.txt") as file:
    lines = [line.strip() for line in file.readlines()]

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

    print("Pair No: {2} ... left: {0} ... right: {1}".format(left,right,pairno))
    valid = check(left,right)
    
    # print("left: {0} ... right: {1}".format(left,right))
    print("valid: {0}".format(valid))
    print("--------------------------------------------")
    if valid == -1:
        valids.append(pairno)
    skipnext = True

print(valids)
print(sum(valids))

