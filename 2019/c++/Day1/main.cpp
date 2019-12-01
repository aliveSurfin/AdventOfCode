#include "../utils.h"
#include <stdio.h>
#include <math.h>
#include <iomanip>
#include <chrono>
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    double total;
    auto start = chrono::high_resolution_clock::now();
    for (unsigned x = 0; x < input.size(); x++)
    {
        double test = stod(input.at(x));
        while (test > 0)
        {
            test /= 3;
            test = floor(test);
            test -= 2;
            if (test > 0)
            {
                total += test;
            }
        }
    }
    auto stop = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::microseconds>(stop - start);

    // To get the value of duration use the count()
    // member function on the duration object
    cout << duration.count() << endl;
    cout << setprecision(15) << total << endl; // 3477353 // 5213146
    return 0;
}