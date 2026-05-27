
first_name = ""
last_name = ""
while True:
	first_name = str(input("Enter firstname: ").strip().lower())
	if len(first_name) < 1:
		print("First name cannot be empty")
		continue
	break

while True:
	last_name = str(input("Enter lastname: ").strip().lower())
	if len(last_name) < 1:
		print("Last name cannot be empty")
		continue
	break

fullname = first_name + " " + last_name
	 
print(f"Hello, {fullname}! Welcome to Python.", fullname)


