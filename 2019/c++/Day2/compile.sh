rm a.out
g++ main.cpp ../utils.cpp
time for i in {1..100}; do ./a.out; done
# ./a.out