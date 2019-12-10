#include "../utils.h"
#include <algorithm>
int lastoutput = -37;
int eoutput = -37;
vector<int> tempvector;
int largestOutput;
vector<int> intComp(int prevOut, int amp, bool firstrun, vector<int> intcodes, int pos)
{
    // getchar();
    int x = pos;
    int inputam = false;
    while (x < intcodes.size())
    {
        // getchar();
        // cout << "RAW: " << intcodes.at(x) << " | ";
        string comp = to_string(intcodes.at(x));
        while (comp.size() < 5)
        {
            comp = '0' + comp;
        }
        bool par1im = comp.at(2) == '1';
        bool par2im = comp.at(1) == '1';
        bool par3im = comp.at(0) == '1';
        // cout << "OPCODE: " << comp << " ";
        // cout << "par1 : "
        //      << "imediate: " << par1im;
        // cout << "| par2 : "
        //      << "imediate: " << par2im;
        // cout << "| par3 : "
        //      << "imediate: " << par3im;
        // cout << endl;
        switch (stoi(comp.substr(3)))
        {
        case 99:
        {
            // cout << "STOPING" << endl;
            // x = intcodes.size();
            vector<int> l;
            l.push_back(x);
            l.push_back(99);
            // getchar();
            return l;
            break;
        }
        case 1:
        {
            // cout << "add ";
            // cout << endl;
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
            // cout << "BECOMES : " << intcodes.at(intcodes.at(x + 3)) << endl;
            x += 4;
            break;
        }
        case 2:
        {
            // cout << "mult ";

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
            // cout << "BECOMES : " << intcodes.at(intcodes.at(x + 3)) << endl;
            x += 4;
            break;
        }
        case 3:
            // cout << "inputting " << to_string(amp) << " to " << intcodes.at(x + 1) << endl;
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
        {
            // cout << "OUTPUT : ";
            // cout << to_string((par1im ? intcodes.at(x + 1) : intcodes.at(intcodes.at(x + 1)))) << endl;
            eoutput = (par1im ? intcodes.at(x + 1) : intcodes.at(intcodes.at(x + 1)));
            x += 2;
            tempvector = intcodes;
            vector<int> l;
            l.push_back(x);
            l.push_back(eoutput);
            // getchar();
            return l;
            /**
         * Opcode 4 outputs the value of its only parameter. 
         * For example, the instruction 4,50 would output the value at address 50.
         * */
            break;
        }
        case 5:
        {
            // cout << "jump if true ";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            // cout << operand1;
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
                // cout << " jumped to " << operand2 << endl;
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
            // cout << "jump if false";

            int operand1;
            if (par1im)
            {
                operand1 = intcodes.at(x + 1);
            }
            else
            {
                operand1 = intcodes.at(intcodes.at(x + 1));
            }
            // cout << " " << operand1;
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
                // cout << " jumped" << endl;
            }
            else
            {
                x += 3;
            }
            break;
        }
        case 7:
        {
            // cout << "less than";

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
            // cout << " " << operand1 << " | " << operand2;
            if (operand1 < operand2)
            {
                intcodes.at(intcodes.at(x + 3)) = 1;
                // cout << " :yes " << endl;
            }
            else
            {
                intcodes.at(intcodes.at(x + 3)) = 0;
                // cout << " :no " << endl;
            }
            x += 4;
            break;
        }
        case 8:
        {
            // cout << "equals";

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
            // cout << " " << operand1 << " | " << operand2;
            if (operand1 == operand2)
            {
                intcodes.at(intcodes.at(x + 3)) = 1;
                // cout << " :yes" << endl;
            }
            else
            {
                intcodes.at(intcodes.at(x + 3)) = 0;
                // cout << " :no" << endl;
            }
            x += 4;
            break;
        }

        default:
            exit(1);
        }
        // cout << endl;
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
                    // cout << a << endl;
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
        // cout << a << endl;
    }
    return intcodes;
}
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<int> intcodes;
    intcodes = parseInput(input);
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
                        vector<int> aint = old;
                        int apos = 0;
                        vector<int> bint = old;
                        int bpos = 0;
                        vector<int> cint = old;
                        int cpos = 0;
                        vector<int> dint = old;
                        int dpos = 0;
                        vector<int> eint = old;
                        int epos = 0;
                        vector<int> temp;
                        if (!isUnique(a, b, c, d, e))
                        {
                            continue;
                        }
                        cout << "---------" << endl
                             << endl
                             << "A B C D E" << endl;
                        cout << "---------" << endl;
                        cout << a << " " << b << " " << c << " " << d << " " << e << endl;
                        bool stop = false;
                        bool firstrun = true;
                        while (!stop)
                        {
                            vector<int> cycleinput;

                            vector<int> cycleoutput;
                            int aout;
                            int eout;
                            if (firstrun)
                            {
                                eout = 0;
                            }
                            cycleinput.push_back(eout);
                            temp = intComp(eout, a, firstrun, aint, apos);
                            aout = temp.at(1);
                            apos = temp.at(0);
                            aint = tempvector;

                            cycleinput.push_back(aout);
                            temp = intComp(aout, b, firstrun, bint, bpos);
                            int bout = temp.at(1);
                            bpos = temp.at(0);
                            bint = tempvector;

                            cycleinput.push_back(bout);
                            temp = intComp(bout, c, firstrun, cint, cpos);
                            int ceout = temp.at(1);
                            cpos = temp.at(0);
                            cint = tempvector;

                            cycleinput.push_back(ceout);
                            temp = intComp(ceout, d, firstrun, dint, dpos);
                            int dout = temp.at(1);
                            dpos = temp.at(0);
                            dint = tempvector;

                            cycleinput.push_back(dout);
                            temp = intComp(dout, e, firstrun, eint, epos);
                            eout = temp.at(1);
                            epos = temp.at(0);
                            eint = tempvector;
                            if (eout == 99)
                            {
                                stop = true;
                            }
                            else
                            {
                                // cout << eoutput << endl;
                            }
                            firstrun = false;
                            for (int x = 0; x < cycleinput.size(); x++)
                            {
                                string arrow = (x == cycleinput.size() - 1) ? "v" : "->";
                                cout << cycleinput.at(x) << arrow;
                            }
                            cout << endl;
                        }
                        // cout << eoutput << endl;
                        if (eoutput > largestOutput)
                        {
                            largestOutput = eoutput;
                        }
                        // getchar();
                    }
                }
            }
        }
    }
    // intcodes.at(1) = 0;
    // intcodes.at(2) = 1;
    cout << endl
         << largestOutput << endl;
    return 0;
}