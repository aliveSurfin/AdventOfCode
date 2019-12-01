#include "../utils.h"
#include <stdio.h>
#include <math.h>
#include <iomanip> 
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    double total;
    for (unsigned x = 0; x < input.size(); x++)
    {
        double temp = stod(input.at(x));
        temp /= 3;
        temp = floor(temp);
        temp -= 2;
        total += temp;
    }
    cout << setprecision(15) << total << endl; // 3477353
    return 0;
}