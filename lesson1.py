import math

num1 = ""
num2 = ""


def calculate(a, b): 

	sum = a + b
	diff = a - b
	mul = a * b
	div = a / b
	floor = a // b
	rem = a % b
	print(f"{a} + {b} = {sum}")
	print(f"{a} - {b} = {diff}")
	print(f"{a} * {b} = {mul}")
	print(f"{a} / {b} = {div}")
	print(f"{a} // {b} = {floor}")
	print(f"{a} % {b} = {rem}")


while True:
	first_num = input("Enter a number: ").strip()
	
	if len(first_num) < 1:
		print("Input cannot be empty")
		continue
	num1 = float(first_num)
	if math.isnan(num1):
		print("Enter only numbers")
		continue
	break

while True:
	second_number = input("Enter second number: ").strip()
	
	if len(second_number) < 1:
		print("Input cannot be empty")
		continue	
		
	num2 = float(second_number)
	if math.isnan(num2):
		print("Enter only numbers")
		continue
	break


calculate(num1, num2)

