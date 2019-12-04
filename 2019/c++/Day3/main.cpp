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

vector<string> commands1;
vector<string> commands2;
void loadFromFile()
{
    ifstream fin;
    fin.open("input1.txt");
    char ch;
    string cur = "";
    while (fin >> ch)
    {
        if (ch == ',')
        {
            if (cur != "")
            {
                commands1.push_back(cur);
                cur = "";
            }
        }
        else
        {
            cur += ch;
        }
    }
    if (cur != "")
    {
        commands1.push_back(cur);
    }
    ifstream fin2;
    fin2.open("input2.txt");
    cur = "";
    char ch2;
    while (fin2 >> ch2)
    {
        if (ch2 == ',')
        {
            if (cur != "")
            {
                commands2.push_back(cur);
                cur = "";
            }
        }
        else
        {
            cur += ch2;
        }
    }
    if (cur != "")
    {
        commands2.push_back(cur);
    }
    fin.close();
    fin2.close();
}
class xy
{
public:
    int x;
    int y;
    bool operator==(xy const &rhs) const
    {
        return ((x == rhs.x) && (y == rhs.y));
    }
    xy(int a, int b)
    {
        x = a;
        y = b;
    }
    int distance(xy input)
    {
        // return sqrt((x - input.x)*(x - input.x)+ (y - input.x)*(y - input.x));
        return (abs((input.x - x)) + abs((input.y - y)));
    }
};
class wire
{
public:
    wire()
    {
        points.push_back(xy(0, 0));
    }
    vector<xy> points;
    void move(vector<string> input)
    {
        int curx = 0;
        int cury = 0;
        for (int i = 0; i < input.size(); i++)
        {
            cout << input.at(i) << endl;

            // cout << input.at(i).substr(1) << endl;
            if (input.at(i).at(0) == 'L')
            {
                int x = curx;
                int y = cury;
                // int y = points.at(points.size() - 1).y;
                x -= stoi(input.at(i).substr(1));
                cout << "left move from " << curx << " " << x << endl;
                if (curx < x)
                {
                    for (int a = curx + 1; a <= x; a++)
                    {
                        points.push_back(xy(a, cury));
                    }
                }
                else
                {
                    for (int a = curx - 1; a >= x; a--)
                    {
                        points.push_back(xy(a, cury));
                    }
                }
                curx = x;
            }
            else if (input.at(i).at(0) == 'R')
            {
                int x = curx;
                int y = cury;
                // int y = points.at(points.size() - 1).y;
                x += stoi(input.at(i).substr(1));
                cout << "right move from " << curx << " " << x << endl;
                if (curx < x)
                {
                    for (int a = curx + 1; a <= x; a++)
                    {
                        points.push_back(xy(a, cury));
                    }
                }
                else
                {
                    for (int a = curx - 1; a >= x; a--)
                    {
                        points.push_back(xy(a, cury));
                    }
                }
                curx = x;
            }
            else if (input.at(i).at(0) == 'U')
            {
                int x = curx;
                int y = cury;
                // int y = points.at(points.size() - 1).y;
                y += stoi(input.at(i).substr(1));
                cout << "up move from" << cury << " " << y << endl;
                if (cury < y)
                {
                    for (int a = cury + 1; a <= y; a++)
                    {
                        points.push_back(xy(curx, a));
                    }
                }
                else
                {
                    for (int a = cury - 1; a >= y; a--)
                    {
                        points.push_back(xy(curx, a));
                    }
                }
                cury = y;
            }
            else if (input.at(i).at(0) == 'D')
            {
                int x = curx;
                int y = cury;
                // int y = points.at(points.size() - 1).y;
                y -= stoi(input.at(i).substr(1));
                cout << "down move from" << cury << " " << y << endl;
                if (cury < y)
                {
                    for (int a = cury + 1; a <= y; a++)
                    {
                        points.push_back(xy(curx, a));
                    }
                }
                else
                {
                    for (int a = cury - 1; a >= y; a--)
                    {
                        points.push_back(xy(curx, a));
                    }
                }
                cury = y;
            }
        }
    }
};
int main()
{
    loadFromFile();
    wire wire1;
    wire wire2;
    wire1.move(commands1);
    wire2.move(commands2);
    int distance = 2147000000;
    int steps = distance;
    int xout = 0;
    int yout = 0;
    long long int count = 0;
    for (long long int x = 1; x < wire1.points.size(); x++)
    {
        cout << ((float)count / float((wire1.points.size() * wire2.points.size()))) * 100 << " " << distance << " " << xout << " " << yout << endl;
        for (long long int y = 1; y < wire2.points.size(); y++)
        {
            count++;

            if (wire1.points.at(x).x == wire2.points.at(y).x && wire1.points.at(x).y == wire2.points.at(y).y && abs(wire1.points.at(x).x) != 0)
            {
                if ((abs(wire1.points.at(x).x) + abs(wire1.points.at(x).y)) < distance)
                {
                    distance = abs(wire1.points.at(x).x) + abs(wire1.points.at(x).y);
                    xout = wire1.points.at(x).x;
                    yout = wire1.points.at(x).y;
                    cout << " " << distance << " " << xout << " " << yout << endl;
                }
                if (x + y < steps)
                {
                    steps = x + y;
                }
            }
        }
    }
    cout << distance << endl; // 651
    cout << steps << endl;    //7534
}