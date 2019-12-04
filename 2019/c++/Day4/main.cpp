#include <stdio.h>
#include <math.h>
#include <string>
#include <fstream>
#include <iostream>
#include <iomanip>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;
int main()
{
    int lowerlimit = 108457;
    int higherlimit = 562041;
    int count = 0;
    for (int num = lowerlimit; num < higherlimit; num++)
    {
        stringstream ss;
        ss << num;
        string comp = ss.str();
        if (comp.size() != 6)
        {
            continue;
        }
        bool hasdouble = false;
        bool isok = false;
        int doubles = 0;

        for (int x = 0; x < comp.size() - 1; x++)
        {

            if ((comp.at(x) - '0') <= (comp.at(x + 1) - '0'))
            {
                // cout << comp.at(x) << " is less than " << comp.at(x + 1) << endl;
                isok = true;
            }
            else
            {
                // cout << comp.at(x) << " is not less than " << comp.at(x + 1) << endl;
                isok = false;
                break;
            }
        }
        if (!isok)
        {
            continue;
        }
        for (int x = 0; x < comp.size(); x++)
        {
            stringstream ssd;
            ssd << comp.at(x);
            string doub = ssd.str();
            doub += doub;
            bool noLargerGroup = true;
            if (comp.find(doub) != string::npos)
            {
                for (int a = 0; a < 4; a++)
                {
                    doub += ssd.str();
                    if (comp.find(doub) != string::npos)
                    {
                        noLargerGroup = false;
                        break;
                    }
                }
                if (noLargerGroup == true)
                {
                    hasdouble = true;
                }
                // cout << comp.at(x) + "" + comp.at(x) << endl;
            }
        }
        if (isok == true && hasdouble == true)
        {
            count++;
            cout << num << endl;
        }
    }
    cout << count << endl;
    return 0;
}