#include "../utils.h"
#include <algorithm>
class direction
{
public:
    bool operator==(direction const &obj)
    {
        return (obj.x == x && obj.y == y);
    }
    int x;
    int y;
    direction(int a, int b)
    {
        x = a;
        y = b;
    }
};
class point
{
public:
    int x;
    int y;
    int visited;
    int dirpos;
    vector<direction> directions;
    int colour;
    bool operator==(point const &obj)
    {
        return (obj.x == x && obj.y == y);
    }
    void move()
    {
        x += directions.at(dirpos).x;
        y += directions.at(dirpos).y;
    }
    string debugPrint()
    {
        string out = "";
        out += "x: " + to_string(x) + " y: " + to_string(y);
        out += colour == 0 ? " black" : " white";
        out += "\n";
        out += "visits: " + to_string(visited);
        out += " direction: ";
        switch (dirpos)
        {
        case 0:
            out += "up";
            break;
        case 1:
            out += "right";
            break;
        case 2:
            out += "down";
            break;
        case 3:
            out += "left";
            break;
        }
        out += "\n ---------------------------------\n";
        return out;
    }
    point(int a, int b, int dpos)
    {
        x = a;
        y = b;
        visited = 0;
        colour = 0;
        dirpos = dpos;
        directions.push_back(direction(0, -1)); //up
        directions.push_back(direction(1, 0));  //right
        directions.push_back(direction(0, 1));  //down
        directions.push_back(direction(-1, 0)); //left
    }
    void changedir(int lr) // 0 left 90 degrees // 1 right 90 degrees
    {
        if (lr == 0)
        {
            if (dirpos == 0)
            {
                dirpos = 3;
            }
            else
            {
                dirpos--;
            }
        }
        else if (lr == 1)
        {
            if (dirpos == 3)
            {
                dirpos = 0;
            }
            else
            {
                dirpos++;
            }
        }
        else
        {
            cout << "ERROR " << endl;
            exit(1);
        }
    }
    direction getDirection()
    {
        return directions.at(dirpos);
    }
};
class intComp
{
public:
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
                // if (colour != 0 && colour != 1)
                // {
                //     exit(1);
                // }
                memory.at(getInputPosition(par1mode, 1)) = colour;
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
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    vector<long long int> intcodes;
    intcodes = parseInput(input);
    intComp i(intcodes, false);
    point p(0, 0, 0);
    vector<point> points;
    p.colour = 0;
    points.push_back(p);
    int prevcol = 0;
    while (true)
    {
        bool found = false;
        for (int x = 0; x < points.size(); x++)
        {
            if (points.at(x) == p)
            {
                prevcol = points.at(x).colour;
                found = true;
                break;
            }
        }
        if (!found)
        {
            prevcol = 0;
        }
        i.colour = prevcol;
        bool foundforcol = false;
        int col = i.compute();
        if (col == 99)
        {
            break;
        }
        for (int x = 0; x < points.size(); x++)
        {
            if (points.at(x) == p)
            {
                points.at(x).colour = col;
                points.at(x).dirpos = p.dirpos;
                p = points.at(x);

                foundforcol = true;
                break;
            }
        }
        if (!foundforcol)
        {
            p.colour = col;
            points.push_back(p);
        }
        //direction
        int dir = i.compute();
        p.changedir(dir);
        p.move();
    }
    cout << points.size() << endl;
    int maxX = 0;
    int minX = 2147000000;
    int maxY = 0;
    int minY = 2147000000;
    for (int x = 0; x < points.size(); x++)
    {
        if (points.at(x).x > maxX)
        {
            maxX = points.at(x).x;
        }
        if (points.at(x).y > maxY)
        {
            maxY = points.at(x).y;
        }

        if (points.at(x).x < minX)
        {
            minX = points.at(x).x;
        }
        if (points.at(x).y < minY)
        {
            minY = points.at(x).y;
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
    for (int x = 0; x < points.size(); x++)
    {
        output.at(points.at(x).y+abs(minY)).at(points.at(x).x+abs(minX)) = points.at(x).colour == 1 ? '#' : '.';
    }
    for (int x = 0; x < output.size(); x++)
    {
        cout << output.at(x) << endl;
    }
    return 0;
}