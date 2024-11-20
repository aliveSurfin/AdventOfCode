# Makefile to run specific day scripts using `npm run day`
.PHONY: all

# Run all scripts
all:
	npm run all

# Define the default target pattern
%:
	@DAY=$(shell printf "%02d" $@) npm run day

# Create a new day's directory by copying ./days/00
new%:
	@DAY=$(shell printf "%02d" $*); \
	if [ -d ./days/$$DAY ]; then \
		echo "Directory ./days/$$DAY already exists"; \
	else \
		cp -r ./days/00 ./days/$$DAY; \
		echo "Created ./days/$$DAY"; \
		if [ -f ./days/$$DAY/day.ts ]; then \
			sed -i "s/Day0/Day$$DAY/g" ./days/$$DAY/day.ts; \
			echo "Replaced 'Day0' with 'Day$$DAY' in ./days/$$DAY/day.ts"; \
		else \
			echo "Warning: day.ts not found in ./days/$$DAY"; \
		fi \
	fi
	