#include "../utils.h"
#include <algorithm>
#include <iostream>
#include <random>

typedef std::mt19937 rng_type;

rng_type rng;
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
    char value;
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
    bool hasFoundOxygen;
    int rand_lim(int a, int b)
    {
        std::uniform_int_distribution<rng_type::result_type> udist(a, b);
        /* return a random number in the range [0..limit)
 */
        rng_type::result_type const seedval = time(NULL);
        rng.seed(seedval);
        rng_type::result_type random_number = udist(rng);
        //cout << random_number << endl;
        return random_number;
    }
    void changeInput()
    {
        if (inputPos == 0)
        {
            int r = rand_lim(0, 2);
            if (r == 0)
            {
                inputPos = 1;
            }
            else if (r == 1)
            {
                inputPos = 2;
            }
            else
            {
                inputPos = 3;
            }
        }
        else if (inputPos == 1)
        {
            int r = rand_lim(0, 2);
            if (r == 0)
            {
                inputPos = 3;
            }
            else if (r == 1)
            {
                inputPos = 2;
            }
            else
            {
                inputPos = 0;
            }
        }
        else if (inputPos == 2)
        {
            int r = rand_lim(0, 2);
            if (r == 0)
            {
                inputPos = 1;
            }
            else if (r == 1)
            {
                inputPos = 0;
            }
            else
            {
                inputPos = 3;
            }
        }
        else
        {
            int r = rand_lim(0, 2);
            if (r == 0)
            {
                inputPos = 1;
            }
            else if (r == 1)
            {
                inputPos = 2;
            }
            else
            {
                inputPos = 0;
            }
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
        hasFoundOxygen = false;
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
                if (output == 2)
                {
                    hasFoundOxygen = true;
                }
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
void display(vector<pos> map, vector<pos> walls, int curx, int cury)
{
    vector<string> a;
    for (int x = 0; x < 50; x++)
    {
        string b;
        for (int y = 0; y < 50; y++)
        {
            b += " ";
        }
        a.push_back(b);
    }
    for (int x = 0; x < map.size(); x++)
    {
        if (map.at(x).y == 25 && map.at(x).x == 25)
        {
            if (map.at(x).value != 'o')
            {

                continue;
            }
        }
        if (map.at(x).x == curx && map.at(x).y == cury)
        {
            a.at(map.at(x).y).at(map.at(x).x) = '%';
        }
        else
        {
            a.at(map.at(x).y).at(map.at(x).x) = map.at(x).value;
        }
    }
    for (int x = 0; x < walls.size(); x++)
    {
        if (walls.at(x).y == 25 && walls.at(x).x == 25)
        {
            continue;
        }
        a.at(walls.at(x).y).at(walls.at(x).x) = walls.at(x).value;
    }
    for (int x = 0; x < 100; x++)
    {
        cout << "-";
    }
    cout << endl;
    for (int x = 0; x < a.size(); x++)
    {
        cout << "| ";
        for (int y = 0; y < a.at(x).size(); y++)
        {
            cout << a.at(x).at(y) << " ";
        }
        cout << " |";
        cout << endl;
    }
    for (int x = 0; x < 100; x++)
    {
        cout << "-";
    }
    cout << endl;
}
int reverseDirection(int a)
{
    if (a == 0)
    {
        return 1;
    }
    if (a == 1)
    {
        return 0;
    }
    if (a == 2)
    {
        return 3;
    }
    if (a == 3)
    {
        return 2;
    }
}
vector<pos> addToVector(vector<pos> v, pos p)
{
    if (find(v.begin(), v.end(), p) == v.end())
    {
        v.push_back(p);
    }
    return v;
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
    vector<pos> walls;
    map.push_back(pos(25, 25));
    map.at(map.size() - 1).value = 'o';
    int xpos = 25;
    int ypos = 25;
    int sametile = 0;
    vector<int> steps;
    while (!i.hasFoundOxygen)
    {

        i.compute();
        if (i.lastOutput == 1)
        {
            pos p = pos(xpos, ypos, i.input.at(i.inputPos));
            xpos = p.x;
            ypos = p.y;
            p.value = '.';
            map = addToVector(map, p);
            cout << xpos << " " << ypos << " map" << endl;
            steps.push_back(i.inputPos);
            sametile = 0;
            //i.inputPos = rand_lim(3);
        }
        else if (i.lastOutput == 0)
        {
            sametile++;
            if (sametile >= 4 && steps.size() > 2)
            {
                for (int x = steps.size() - 1; x > -1; x--)
                {
                    i.inputPos = reverseDirection(steps.at(x));
                    i.compute();
                    if (i.hasFoundOxygen)
                    {
                        break;
                    }
                    if (i.lastOutput == 1)
                    {
                        pos p = pos(xpos, ypos, i.input.at(i.inputPos));
                        xpos = p.x;
                        ypos = p.y;
                        p.value = '.';
                        map = addToVector(map, p);
                        cout << xpos << " " << ypos << " map" << endl;
                        //steps.push_back(i.input.at(i.inputPos));
                    }
                    else if (i.lastOutput == 0)
                    {
                        pos p = pos(xpos, ypos, i.input.at(i.inputPos));
                        p.value = '#';
                        walls = addToVector(walls, p);
                        cout << p.x << " " << p.y << " wall" << endl;
                    }
                    // display(map, walls);
                    cout << "REVERSING" << endl;
                }
                steps.clear();
                sametile = 0;
            }
            else
            {
                pos p = pos(xpos, ypos, i.input.at(i.inputPos));
                p.value = '#';
                walls = addToVector(walls, p);
                cout << p.x << " " << p.y << " wall" << endl;
                // i.changeInput();
                int a = i.rand_lim(0, 3);
                while (a == i.inputPos || a == reverseDirection(i.inputPos))
                {
                    a = i.rand_lim(0, 3);
                }
                i.inputPos = a;
            }
        }
        display(map, walls, xpos, ypos);
    }
    map.push_back(pos(map.at(map.size() - 1).x, map.at(map.size() - 1).y, i.input.at(i.inputPos)));
    map.at(map.size() - 1).value = '*';
    display(map, walls, xpos, ypos);
}