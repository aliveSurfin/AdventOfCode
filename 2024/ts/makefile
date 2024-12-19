# Makefile to run specific day scripts using `npm run day`
.PHONY: all

# Run all scripts
all:
	@npm run all | tee output.txt
	@./generate_chart.sh

# Define the default target pattern
%:
	@DAY=$(shell printf "%02d" $@) npm run day

# Create a new day's directory by copying ./days/00
new%:
	@DAY=$(shell printf "%02d" $*); \
	DAY_INT=$$(echo $$DAY | sed 's/^0*//'); \
	if [ -d ./days/$$DAY ]; then \
		printf "\033[1;33mDirectory ./days/$$DAY already exists\033[0m\n"; \
	else \
		cp -r ./days/00 ./days/$$DAY; \
		printf "\033[1;32mCreated ./days/$$DAY\033[0m\n"; \
		if [ -f ./days/$$DAY/day.ts ]; then \
			if [ "$(shell uname)" = "Darwin" ]; then \
				sed -i "" "s/Day0/Day$$DAY/g" ./days/$$DAY/day.ts; \
			else \
				sed -i "s/Day0/Day$$DAY/g" ./days/$$DAY/day.ts; \
			fi; \
			printf "\033[1;32mReplaced 'Day0' with 'Day$$DAY' in ./days/$$DAY/day.ts\033[0m\n"; \
			printf "\033[1;34mhttps://adventofcode.com/2024/day/$$DAY_INT\033[0m\n"; \
			if [ -n "$$WSL_DISTRO_NAME" ]; then \
				cmd.exe /C start "https://adventofcode.com/2024/day/$$DAY_INT/input"; \
				cmd.exe /C start "https://adventofcode.com/2024/day/$$DAY_INT"; \
			fi; \
		else \
			printf "\033[1;31mWarning: day.ts not found in ./days/$$DAY\033[0m\n"; \
		fi \
	fi
