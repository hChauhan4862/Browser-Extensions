arr = [1,3,7,5,6]

arr.sort()
SUMM = arr[0]
TEMP = []
for i in range(1,len(arr)):
    SUMM += arr[i]
    TEMP.append(SUMM)

print(TEMP)
print(sum(TEMP))