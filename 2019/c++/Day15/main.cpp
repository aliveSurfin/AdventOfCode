#include "../utils.h"
#include <algorithm>
#include <iostream>
using namespace std;
class pos
{
public:
    bool operator==(const pos &obj) const
    {
        return (x == obj.x && y == obj.y);
    }
    int x;
    int y;
    pos(int x, int y, int move = -1)
    {
        if (move == -1)
        {
            this->x = x;
            this->y = y;
            return;
        }
        switch (move)
        {
        case 1:
            this->x = x;
            this->y = y - 1;
            return;
        case 2:
            this->x = x;
            this->y = y + 1;
            return;
        case 3:
            this->y = y;
            this->x = x - 1;
            return;
        case 4:
            this->y = y;
            this->x = x + 1;
            return;
        }
    }
};
class intComp
{
public:
    intComp();
    vector<long long int> memory;
    long long int memoryPos;
    long long int lastOutput;
    int relativeBase;
    int colour;
    bool debug;
    vector<int> input;
    int inputPos;
    void incrementInput()
    {
        if (inputPos == 3)
        {
            inputPos = 0;
        }
        else
        {
            inputPos++;
        }
    }
    intComp(vector<long long int> code, bool db)
    {
        inputPos = 0;
        memoryPos = 0;
        memory = code;
        cout << "allocating memory" << endl;
        memory.resize(1000000, 0);
        cout << "memory allocted" << endl;
        relativeBase = 0;
        debug = db;
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
        if (debug)
            cout << a << endl;
        return a;
    }
    int getInputPosition(int mode, int par)
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
        if (debug)
            cout << a << endl;
        //return memory.at(memoryPos + par);
        return a;
    }
    int compute()
    {

        while (true)
        {
            // getchar();
            string comp = to_string(memory.at(memoryPos));
            if (debug)
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
                if (debug)
                {
                    cout << "adding " << operand1 << " + " << operand2 << " | into position " << to_string(memory.at(memoryPos + 3)) << endl;
                }
                memory.at(getInputPosition(par3mode, 3)) = operand1 + operand2;
                memoryPos += 4;
                break;
            }
            case 2:
            {
                long long int operand1 = getOperand(par1mode, 1);
                long long int operand2 = getOperand(par2mode, 2);
                if (debug)
                {
                    cout << "mult " << operand1 << " + " << operand2 << " | into position " << to_string(memory.at(getInputPosition(par3mode, 3))) << endl;
                }
                memory.at(getInputPosition(par3mode, 3)) = operand1 * operand2;
                if (debug)
                {
                    cout << "result " << memory.at(getInputPosition(par3mode, 3)) << endl;
                }
                memoryPos += 4;
                break;
            }
            case 3:
            {
                if (debug)
                {
                    cout << "set colour to " << colour << endl;
                }
                memory.at(getInputPosition(par1mode, 1)) = input.at(inputPos);
                //getchar();

                memoryPos += 2;
                break;
            }
            case 4:
            {
                //getchar();
                long long int output;
                long long int operand1 = getOperand(par1mode, 1);
                output = operand1;
                lastOutput = output;
                memoryPos += 2;
                if (debug)
                {
                    cout << "OUTPUTTING " << output << endl;
                }
                //getchar();
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
                if (debug)
                {
                    cout << "jump if true : " << operand1 << endl;
                }
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
                if (debug)
                {
                    cout << "jump if false" << operand1 << endl;
                }
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
                if (debug)
                {
                    cout << "less than : " << operand1 << " < " << operand2 << " | " << memory.at(getInputPosition(par3mode, 3)) << endl;
                }
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
                if (debug)
                {
                    cout << "equals"
                         << " | " << memory.at(getInputPosition(par3mode, 3)) << endl;
                }
                memoryPos += 4;
                break;
            }
            case 9:
            {

                long long int operand1 = getOperand(par1mode, 1);
                if (debug)
                {
                    cout << "chaing relative base : " << relativeBase << " + " << operand1 << endl;
                }
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
int rand_lim(int limit)
{
    /* return a random number in the range [0..limit)
 */

    int divisor = RAND_MAX / limit;
    int retval;

    do
    {
        retval = rand() / divisor;
    } while (retval == limit);

    return retval + 1;
}
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<long long int> intcodes;
    intcodes = parseInput(input);
    intComp i(intcodes, false);
    i.input = {1, 2, 3, 4};
    vector<pos> map;
    map.push_back(pos(0, 0));
    bool cont = true;
    int xpos = 0;
    int ypos = 0;
    int runs = 0;
    while (cont)
    {
        int out = i.compute();
        xpos = pos(xpos, ypos, i.input.at(i.inputPos)).x;
        ypos = pos(xpos, ypos, i.input.at(i.inputPos)).y;
        cout << xpos << " " << ypos << " | " << out << endl;
        //getchar();
        switch (out)
        {
        case 0:
        {
            i.inputPos = rand_lim(3);
            break;
        }
        case 1:
        {
            if (find(map.begin(), map.end(), pos(xpos, ypos)) == map.end())
            {
                map.push_back(pos(xpos, ypos));
            }
            break;
        }
        case 2:
        {
            cont = false;
            break;
        }
        case 99:
            cout << "wow " << endl;
        }
    }
}