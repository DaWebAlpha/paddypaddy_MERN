import math



while True:
	temp = input("Enter temperature value to convert: ").strip()
	
	if len(temp) < 1: 
		print("Input cannot be empty")
		continue
	temperature = float(temp)

	if math.isnan(temperature):
		print("Input must be a number");
		continue
	
	
	break
while True:
	unit = input("Enter C for celcius or F for fahrenheit: ").upper()

	if len(unit) < 1:
		print("Input cannot be empty")
		continue
	if unit != "C" or unit != "F":
		print("You can only enter C or F")
		continue

		
