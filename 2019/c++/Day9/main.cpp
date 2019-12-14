#include "../utils.h"
#include <algorithm>
class intComp
{
public:
    vector<long long int> memory;
    long long int memoryPos;
    long long int lastOutput;
    int relativeBase;
    intComp(vector<long long int> code)
    {
        memoryPos = 0;
        memory = code;
        cout << "allocating memory" << endl;
        memory.resize(1000000, 0);
        cout << "memory allocted" << endl;
        relativeBase = 0;
    }
    long long int getOperand(int mode, int par)
    {
        long long int a;
        switch (mode)
        {
        case 0:
            a = memory.at(memory.at(memoryPos + par));
            break;
        case 1:
            a = memory.at(memoryPos + par);
            break;

        case 2:
            a = memory.at(memory.at(memoryPos + par) + relativeBase);
            break;
        }
        cout << a << endl;
        return a;
    }
    long long int getInputPosition(int mode, int par)
    {
        long long int a;
        switch (mode)
        {
        case 0:
            a = memory.at(memoryPos + par);
            break;
        case 1:
            a = memoryPos + par;
            break;

        case 2:
            a = memory.at(memoryPos + par) + relativeBase;
            break;
        }
        cout << a << endl;
        return a;
    }
    int compute()
    {

        while (true)
        {
            // getchar();
            string comp = to_string(memory.at(memoryPos));
            cout << "RAW : " << comp << " |1: " << memory.at(memoryPos + 1) << " |2: " << memory.at(memoryPos + 2) << " |3: " << memory.at(memoryPos + 3) << endl;
            while (comp.size() < 5)
            {
                comp = '0' + comp;
            }
            int par1mode = comp.at(2) - '0';
            int par2mode = comp.at(1) - '0';
            int par3mode = comp.at(0) - '0';
            switch (stoi(comp.substr(3)))
            {
            case 99:
            {
                cout << "stopping" << endl;
                return 99;
                break;
            }
            case 1:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                cout << "adding " << operand1 << " + " << operand2 << " | into position " << to_string(memory.at(memoryPos + 3)) << endl;
                memory.at(getInputPosition(par3mode, 3)) = operand1 + operand2;
                memoryPos += 4;
                break;
            }
            case 2:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                cout << "mult " << operand1 << " + " << operand2 << " | into position " << to_string(memory.at(getInputPosition(par3mode, 3))) << endl;
                memory.at(getInputPosition(par3mode, 3)) = operand1 * operand2;
                cout << "result " << memory.at(getInputPosition(par3mode, 3)) << endl;
                memoryPos += 4;
                break;
            }
            case 3:
            {
                memory.at(getInputPosition(par1mode, 1)) = 2;
                memoryPos += 2;
                break;
            }
            case 4:
            {
                long long int output;
                long long int operand1 = getOperand(par1mode, 1);
                if (par1mode == 0)
                {
                    output = memory.at(memory.at(memoryPos + 1));
                }
                else if (par1mode == 1)
                {
                    output = memory.at(memoryPos + 1);
                }
                else
                {
                    output = memory.at(relativeBase + memory.at(memoryPos + 1));
                }
                output = operand1;
                lastOutput = output;
                memoryPos += 2;
                cout << "OUTPUTTING " << output << endl;
                getchar();
                return output;
                break;
            }
            case 5:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                if (operand1 != 0)
                {
                    memoryPos = operand2;
                }
                else
                {
                    memoryPos += 3;
                }
                cout << "jump if true : " << operand1 << endl;
                break;
            }
            case 6:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                if (operand1 == 0)
                {
                    memoryPos = operand2;
                }
                else
                {
                    memoryPos += 3;
                }
                cout << "jump if false" << operand1 << endl;
                break;
            }
            case 7:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                if (operand1 < operand2)
                {
                    memory.at(getInputPosition(par3mode, 3)) = 1;
                }
                else
                {
                    memory.at(getInputPosition(par3mode, 3)) = 0;
                }
                cout << "less than : " << operand1 << " < " << operand2 << " | " << memory.at(getInputPosition(par3mode, 3)) << endl;
                memoryPos += 4;

                break;
            }
            case 8:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                if (operand1 == operand2)
                {
                    memory.at(getInputPosition(par3mode, 3)) = 1;
                }
                else
                {
                    memory.at(getInputPosition(par3mode, 3)) = 0;
                }
                cout << "equals"
                     << " | " << memory.at(getInputPosition(par3mode, 3)) << endl;
                memoryPos += 4;
                break;
            }
            case 9:
            {

                long long int operand1 = getOperand(par1mode, 1);
                cout << "chaing relative base : " << relativeBase << " + " << operand1 << endl;
                relativeBase += operand1;
                memoryPos += 2;
                break;
            }
            default:
            {
                cout << "wrong move" << endl;
                exit(1);
            }
            }
        }
    }
};

vector<long long int> parseInput(vector<string> input)
{
    vector<long long int> intcodes;
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
                    intcodes.push_back(stoll(a));
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
        intcodes.push_back(stoll(a));
        // cout << a << endl;
    }
    return intcodes;
}
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<long long int> intcodes;
    intcodes = parseInput(input);
    intComp i(intcodes);
    vector<long long int> test;
    bool cont = true;
    while (cont)
    {
        long long int output = i.compute();
        if (output == 99)
        {
            cont = false;
        }
    }
    for (int x = 0; x < test.size(); x++)
    {
        cout << test.at(x) << " , ";
    }
    cout << endl;
    return 0;
}