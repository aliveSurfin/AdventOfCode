#include "../utils.h"
#include <algorithm>
#include <iostream>
using namespace std;

#define KEY_UP 72
#define KEY_DOWN 80
#define KEY_LEFT 75
#define KEY_RIGHT 77
class piece
{
public:
    int x;
    int y;
    int type;
    bool operator==(const piece &obj) const
    {
        return (obj.x == x && obj.y == y);
    }
    piece(int x, int y, int type)
    {
        this->x = x;
        this->y = y;
        this->type = type;
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
    intComp(vector<long long int> code, bool db)
    {
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
                int dir;
                int c = 0;
                char ch;
                cout << "INPUT <- a | s | d ->" << endl;
                // getchar();
                // cout << colour << endl;
                // cin >> ch;
                // switch (ch)
                // {
                // case 'a':
                //     dir = -1;
                //     break;
                // case 'd':
                //     dir = 1;
                //     break;
                // case 'A':
                //     dir = -1;
                //     break;
                // case 'D':
                //     dir = 1;
                //     break;
                // default:
                //     dir = 0;
                //     break;
                // }
                dir = colour;
                cout << "dir " << dir << endl;
                memory.at(getInputPosition(par1mode, 1)) = dir;
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
class board
{
public:
    int ballx;
    int paddlex;
    bool stop;
    vector<piece> pieces;
    vector<string> output;
    int score;
    intComp &i;
    board(intComp &i) : i(i){};
    void setPlayFree()
    {
        i.memory.at(0) = 2;
        stop = false;
    }
    void play()
    {
        while (!stop)
        {
            createPieces();
        }
    }
    void createPieces()
    {
        while (true)
        {
            int x = i.compute();
            int y = i.compute();
            int type = i.compute();

            if (x == 99 || y == 99 || type == 99)
            {
                stop = true;
                break;
            }
            if (x == -1 && y == 0)
            {
                score = type;
                cout << "SCORE " << score << endl;
                continue;
            }
            if (type == 3)
            {
                paddlex = x;
            }
            else if (type == 4)
            {
                ballx = x;
            }
            if (ballx < paddlex)
            {
                i.colour = -1;
            }
            else if (ballx > paddlex)
            {
                i.colour = 1;
            }
            else
            {
                i.colour = 0;
            }
            pieces.push_back(piece(x, y, type));
            createOutput();
        }
    }
    void createOutput()
    {
        output.clear();
        int maxX = 0;
        int minX = 2147000000;
        int maxY = 0;
        int minY = 2147000000;
        for (int x = 0; x < pieces.size(); x++)
        {
            if (pieces.at(x).x > maxX)
            {
                maxX = pieces.at(x).x;
            }
            if (pieces.at(x).y > maxY)
            {
                maxY = pieces.at(x).y;
            }

            if (pieces.at(x).x < minX)
            {
                minX = pieces.at(x).x;
            }
            if (pieces.at(x).y < minY)
            {
                minY = pieces.at(x).y;
            }
        }
        maxX = maxX + abs(minX);
        maxY = maxY + abs(minY);
        string a = "";
        while (a.size() <= (maxX))
        {
            a += " ";
        }
        vector<string> output;
        for (int x = 0; x <= maxY; x++)
        {
            output.push_back(a);
        }
        for (int x = 0; x < pieces.size(); x++)
        {
            char p;
            switch (pieces.at(x).type)
            {
            case 0:
                p = ' ';
                break;
            case 1:
                p = 'w';
                break;
            case 2:
                p = '#';
                break;
            case 3:
                p = '_';
                break;
            case 4:
                p = 'o';
                break;
            }
            output.at(pieces.at(x).y + abs(minY)).at(pieces.at(x).x + abs(minX)) = p;
        }
        int blockcount = 0;
        for (int x = 0; x < output.size(); x++)
        {
            for (int y = 0; y < output.at(x).size(); y++)
            {
                if (output.at(x).at(y) == '#')
                {
                    blockcount++;
                }
            }
        }
        cout << "SCORE : " << score << endl;
        this->output = output;
        for (int x = 0; x < output.size(); x++)
        {
            for (int y = 0; y < output.at(x).size(); y++)
            {
                cout << output.at(x).at(y) << " ";
            }
            cout << endl;
        }
    }
};
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<long long int> intcodes;
    intcodes = parseInput(input);
    intComp i(intcodes, false);
    board b(i);
    b.setPlayFree();
    b.play();
    return 0;
}