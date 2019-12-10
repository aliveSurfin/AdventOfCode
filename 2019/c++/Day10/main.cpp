#include "../utils.h"
#include <vector>
#include <cmath>
#include <string>
using namespace std;
bool isBlocked(int x1, int y1, int x2, int y2)
{
}
class point
{
public:
    int x;
    int y;
    string print;
    bool operator==(const point &rhs) const
    {
        return ((x == rhs.x) && (y == rhs.y));
    }
    bool operator!=(const point &rhs) const
    {
        return ((x != rhs.x) && (y != rhs.y));
    }
    vector<point> viewable;
    vector<point> notviewable;
    void addviewable(point p)
    {
        if (p.x == x && p.y == y)
        {
            return;
        }
        bool add = true;
        for (int x = 0; x < viewable.size(); x++)
        {
            if (viewable.at(x).x == p.x && viewable.at(x).x == p.x)
            {
                add = false;
                break;
            }
        }
        if (add)
        {
            viewable.push_back(p);
        }
    }
    void addnotviewable(point p)
    {
        if (p.x == x && p.y == y)
        {
            return;
        }
        bool add = true;
        for (int x = 0; x < notviewable.size(); x++)
        {
            if (notviewable.at(x).x == p.x && notviewable.at(x).x == p.x)
            {
                add = false;
                break;
            }
        }
        if (add)
        {
            notviewable.push_back(p);
        }
    }
    point(int a, int b)
    {
        x = a;
        y = b;
        print = " " + to_string(x) + " , " + to_string(y);
    }
};
int distance(point p1, point p2)
{
    // cout << sqrt((p2.y - p1.y) * (p2.y - p1.y) + (p2.x - p1.x) * (p2.x - p1.x)) << endl;
    return sqrt((p2.y - p1.y) * (p2.y - p1.y) + (p2.x - p1.x) * (p2.x - p1.x));
}
bool iscollinear(point p1, point p2, point p3)
{
    int a = p1.x * (p2.y - p3.y) +
            p2.x * (p3.y - p1.y) +
            p3.x * (p1.y - p2.y);
    if (a == 0)
    {
        return true;
    }
    return false;
}
bool isBetween(point a, point b, point c) // if p3->p4 is between p1->p2
{
    double crossproduct = (c.y - a.y) * (b.x - a.x) - (c.x - a.x) * (b.y - a.y);
    if (crossproduct != 0)
    {
        return false;
    }
    double dotproduct = (c.x - a.x) * (b.x - a.x) + (c.y - a.y) * (b.y - a.y);
    if (dotproduct < 0)
    {
        return false;
    }
    double sqlenba = (b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y);
    if (dotproduct > sqlenba)
    {
        return false;
    }
    return true;
}
vector<point> calculate(vector<point> all)
{
    for (int a = 0; a < all.size(); a++)
    {

        cout << ((double)a / (double)all.size()) * 100 << endl;
        for (int b = 0; b < all.size(); b++)
        {
            if (a == b)
            {
                continue;
            }
            bool viewable = true;

            for (int c = 0; c < all.size(); c++)
            {
                if (b == c || a == c)
                {
                    continue;
                }
                if (isBetween(all.at(a), all.at(b), all.at(c)))
                {
                    // cout << all.at(c).print << " is between " << all.at(a).print << " and " << all.at(b).print << endl;
                    viewable = false;
                    break;
                }
            }
            if (viewable)
            {
                // cout << "?" << endl;
                all.at(a).addviewable(all.at(b));
            }
            else
            {
                all.at(a).addnotviewable(all.at(b));
            }
        }
    }
    return all;
}
vector<point> calculate2(vector<string> all)
{
    for (int i = 0; i < all.size(); i++)
    {
        
    }
}
int main()
{
    Utils utils;
    vector<string> input = utils.loadFile("input.txt");
    vector<point> asts;
    int highestastcount = 0;
    for (int y = 0; y < input.size(); y++)
    {
        for (int x = 0; x < input.at(y).size(); x++)
        {

            if (input.at(y).at(x) == '#')
            {
                asts.push_back(point(x, y));
            }
        }
    }
    cout << "calculating..." << endl;
    vector<point> calcedasts = calculate(asts);
    cout << "done..." << endl;
    int highest = 0;
    for (int x = 0; x < calcedasts.size(); x++)
    {
        cout << calcedasts.at(x).viewable.size() << endl;
        if (calcedasts.at(x).viewable.size() > highest)
        {
            highest = calcedasts.at(x).viewable.size();
        }
    }
    cout << asts.size() << endl;
    cout << highest << endl;
    return 0;
}