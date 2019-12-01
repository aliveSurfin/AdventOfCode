#include <stdio.h>
#include <math.h>
#include <string>
#include <fstream>
#include <iostream>
#include <iomanip>
int main()
{
    std::fstream fin("input.txt", std::fstream::in);
    std::string line;
    double total2;
    double total1;
    while (getline(fin, line))
    {

        double test = stod(line);
        test = floor((test / 3) - 2);
        total1 += test;
        while (test > 0)
        {
            test = floor((test / 3) - 2);
            if (test > 0)
            {
                total2 += test;
            }
        }
    }
    std::cout << std::setprecision(15) << total1 << std::endl; // 3477353 // 5213146
    std::cout << std::setprecision(15) << total2 << std::endl;
    return 0;
}