import math
from datetime import datetime


while True:
	birth_year = input("Enter year of birth: ").strip()
	
	if len(birth_year) < 1: 
		print("Input cannot be empty")
		continue

	if len(birth_year) != 4:
		print("Enter a valid year")
		continue

	if not birth_year.isdigit():
		print("All characters must be digits")
		continue

	year = int(birth_year)
	currentyear = datetime.now().year	
	age = currentyear - year
	print(f"You are {age} now")
	break

