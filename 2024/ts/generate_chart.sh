#!/bin/bash

# Parse the output file and extract the total time taken for each day
awk '/total time taken:/ {print $4}' output.txt > times.txt

# Generate a simple horizontal bar chart using ASCII characters
echo "Total Time Taken for Each Day"
echo "============================="

# Read times into an array
times=()
while read -r time; do
    times+=("$time")
done < times.txt

# Determine the maximum time for scaling
max_time=0
for time in "${times[@]}"; do
    if (( $(echo "$time > $max_time" | bc -l) )); then
        max_time=$time
    fi
done

# Print the bar chart
day=1
for time in "${times[@]}"; do
    bar_length=$(echo "($time / $max_time) * 50" | bc -l)  # Scale to a max length of 50 characters
    bar=$(printf "%0.s#" $(seq 1 $(printf "%.0f" "$bar_length")))
    printf "Day %02d: %-50s (%.4f ms)\n" "$day" "$bar" "$time"
    day=$((day + 1))
done