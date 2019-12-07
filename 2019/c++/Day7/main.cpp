#include "../utils.h"
#include <algorithm>
int lastoutput = -37;
int eoutput = -37;
vector<int> intcodes;
int intComp(int prevOut, int amp, bool firstrun)
{
    int x = 0;
    int inputam = false;
    while (x < intcodes.size())
    {
        // getchar();
        cout << "RAW: " << intcodes.at(x) << " | ";
        string comp = to_string(intcodes.at(x));
        while (comp.size() < 5)
        {
            comp = '0' + comp;
        }
        bool par1im = comp.at(2) == '1';
        bool par2im = comp.at(1) == '1';
        bool par3im = comp.at(0) == '1';
        cout << "OPCODE: " << comp << " ";
        cout << "par1 : "
             << "imediate: " << par1im;
        cout << "| par2 : "
             << "imediate: " << par2im;
        cout << "| par3 : "
             << "imediate: " << par3im;
        cout << endl;
        switch (stoi(comp.substr(3)))
        {
        case 99:
            cout << "STOPING" << endl;
            x = intcodes.size();
            break;
        case 1:
        {
            cout << "add ";
            cout << endl;
            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            intcodes.at(intcodes.at(x + 3)) = operand1 + operand2;
            cout << "BECOMES : " << intcodes.at(intcodes.at(x + 3)) << endl;
            x += 4;
            break;
        }
        case 2:
        {
            cout << "mult ";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            intcodes.at(intcodes.at(x + 3)) = operand1 * operand2;
            cout << "BECOMES : " << intcodes.at(intcodes.at(x + 3)) << endl;
            x += 4;
            break;
        }
        case 3:
            cout << "inputting " << to_string(amp) << " to " << intcodes.at(x + 1) << endl;
            if (firstrun)
            {
                if (!inputam)
                {
                    intcodes.at(intcodes.at(x + 1)) = amp;
                    inputam = true;
                }
                else
                {
                    intcodes.at(intcodes.at(x + 1)) = prevOut;
                }
            }
            else
            {
                intcodes.at(intcodes.at(x + 1)) = prevOut;
            }
            /**
                     * Opcode 3 takes a single integer as input and saves it to the position
                     *  given by its only parameter. For example, the instruction 3,50 would 
                     * take an input value and store it at address 50.
                     * */
            x += 2;
            break;
        case 4:
            cout << "OUTPUT : ";
            cout << to_string((par1im ? intcodes.at(x + 1) : intcodes.at(intcodes.at(x + 1)))) << endl;
            eoutput = (par1im ? intcodes.at(x + 1) : intcodes.at(intcodes.at(x + 1)));
            return eoutput;
            x += 2;
            /**
         * Opcode 4 outputs the value of its only parameter. 
         * For example, the instruction 4,50 would output the value at address 50.
         * */
            break;
        case 5:
        {
            cout << "jump if true ";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            cout << operand1;
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            if (operand1 != 0)
            {
                cout << " jumped to " << operand2 << endl;
                x = operand2;
            }
            else
            {
                x += 3;
            }
            break;
        }
        case 6:
        {
            cout << "jump if false";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            cout << " " << operand1;
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            if (operand1 == 0)
            {
                x = operand2;
                cout << " jumped" << endl;
            }
            else
            {
                x += 3;
            }
            break;
        }
        case 7:
        {
            cout << "less than";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            cout << " " << operand1 << " | " << operand2;
            if (operand1 < operand2)
            {
                intcodes.at(intcodes.at(x + 3)) = 1;
                cout << " :yes " << endl;
            }
            else
            {
                intcodes.at(intcodes.at(x + 3)) = 0;
                cout << " :no " << endl;
            }
            x += 4;
            break;
        }
        case 8:
        {
            cout << "equals";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            int operand2;
            if (par2im)
            {
                operand2 = intcodes.at(x + 2);
            }
            else
            {
                operand2 = intcodes.at(intcodes.at(x + 2));
            }
            cout << " " << operand1 << " | " << operand2;
            if (operand1 == operand2)
            {
                intcodes.at(intcodes.at(x + 3)) = 1;
                cout << " :yes" << endl;
            }
            else
            {
                intcodes.at(intcodes.at(x + 3)) = 0;
                cout << " :no" << endl;
            }
            x += 4;
            break;
        }
        cout << "ERROR FOUND " << endl;
        default: exit(1);
        }
        cout << endl;
    }
}
bool isUnique(int a, int b, int c, int d, int e)
{
    vector<int> wow;
    wow.push_back(a);
    if (find(wow.begin(), wow.end(), b) != wow.end())
    {
        return false;
    }
    wow.push_back(b);
    if (find(wow.begin(), wow.end(), c) != wow.end())
    {
        return false;
    }
    wow.push_back(c);
    if (find(wow.begin(), wow.end(), d) != wow.end())
    {
        return false;
    }
    wow.push_back(d);
    if (find(wow.begin(), wow.end(), e) != wow.end())
    {
        return false;
    }
    return true;
}
vector<int> parseInput(vector<string> input)
{
    // vector<int> intcodes;
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
                    cout << a << endl;
                    a = "";
                }
            }
            else
            {
                a += input.at(x).at(y);
            }
        }
    }
    if (a != "")
    {
        intcodes.push_back(stoi(a));
        cout << a << endl;
    }
    return intcodes;
}
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("inputtest.txt");
    vector<int> intcodes;
    intcodes = parseInput(input);
    cout << "parsed input" << endl;
    vector<int> old = intcodes;
    int output = 0;
    for (int a = 5; a < 10; a++)
    {
        for (int b = 5; b < 10; b++)
        {
            for (int c = 5; c < 10; c++)
            {
                for (int d = 5; d < 10; d++)
                {
                    for (int e = 5; e < 10; e++)
                    {
                        intcodes = old;
                        if (!isUnique(a, b, c, d, e))
                        {
                            continue;
                        }
                        cout << a << " " << b << " " << c << " " << d << " " << e << endl;
                        bool stop = false;
                        bool firstrun = true;
                        while (!stop)
                        {
                            int aout;
                            int eout;
                            if (firstrun)
                            {
                                aout = intComp(0, a, firstrun);
                            }
                            else
                            {
                                aout = intComp(eout, a, firstrun);
                            }
                            int bout = intComp(aout, b, firstrun);
                            int ceout = intComp(bout, c, firstrun);
                            int dout = intComp(ceout, d, firstrun);
                            eout = intComp(dout, e, firstrun);
                            if (eout == 99)
                            {
                                break;
                            }
                        }
                        cout << eoutput << endl;
                        // getchar();
                    }
                }
            }
        }
    }
    // intcodes.at(1) = 0;
    // intcodes.at(2) = 1;
    cout << endl
         << output << endl;
    return 0;
}