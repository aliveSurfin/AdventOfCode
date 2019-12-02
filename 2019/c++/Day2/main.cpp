#include "../utils.h"
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<int> intcodes;
    string a = "";
    for (int x = 0; x < input.size(); x++)
    {
        for (int y = 0; y < input.at(x).size(); y++)
        {

            if (input.at(x).at(y) == ' ' || input.at(x).at(y) == '\n')
            {
                continue;
            }
            if (input.at(x).at(y) == ',')
            {
                if (a != "")
                {
                    intcodes.push_back(stoi(a));
                    a = "";
                }
            }
            else
            {
                a += input.at(x).at(y);
            }
        }
    }
    vector<int> old = intcodes;
    int x = 0;
    for (int input1 = 0; input1 < 100; input1++)
    {
        for (int input2 = 0; input2 < 100; input2++)
        {

            intcodes = old;
            intcodes.at(1) = input1;
            intcodes.at(2) = input2;
            x = 0;
            while (x < intcodes.size() && intcodes.at(x) != 99)
            {
                switch (intcodes.at(x))
                {
                case 1:
                    cout << " adding " << intcodes.at(intcodes.at(x + 1)) << " and " << intcodes.at(intcodes.at(x + 2)) << endl;
                    intcodes.at(intcodes.at(x + 3)) = intcodes.at(intcodes.at(x + 1)) + intcodes.at(intcodes.at(x + 2));

                    break;
                case 2:
                    cout << " mult " << intcodes.at(intcodes.at(x + 1)) << " and " << intcodes.at(intcodes.at(x + 2)) << endl;
                    intcodes.at(intcodes.at(x + 3)) = intcodes.at(intcodes.at(x + 1)) * intcodes.at(intcodes.at(x + 2));

                    break;
                }
                x += 4;
            }
            cout << intcodes.at(0) << endl;
            if (intcodes.at(0) == 19690720 && intcodes.at(x) == 99)
            {
                cout << "FOUND IT " << endl;
                cout << input1 << "  " << input2 << endl;
                input1 = 100;
                input2 = 100;
            }
        }
    }

    return 0;
}