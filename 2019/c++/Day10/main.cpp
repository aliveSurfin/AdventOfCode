#include "../utils.h"
#include <vector>
#include <cmath>
#include <string>
#include <algorithm>
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
    double angle;
    int distance;
    bool operator==(const point &rhs) const
    {
        return ((x == rhs.x) && (y == rhs.y));
    }
    bool operator!=(const point &rhs) const
    {
        return ((x != rhs.x) && (y != rhs.y));
    }
    string output()
    {
        string out;
        out += print;
        out += " angle: " + to_string(angle);
        out += " distance: " + to_string(distance);
        return out;
    }
    void setAngle(point a)
    {
        int deltax = x - a.x;
        int deltay = a.y - y;
        double rads = atan2(deltay, deltax);
        angle = rads * (180.0 / 3.141592653589793238463);
    }
    int viewable;
    vector<point> inview;
    bool destroyed;
    point(int a, int b)
    {
        x = a;
        y = b;
        print = " " + to_string(x) + " , " + to_string(y);
    }
};

struct sortpoints
{
    inline bool operator()(const point &struct1, const point &struct2)
    {
        if (struct1.angle == struct2.angle)
        {
            return struct1.distance < struct2.distance;
        }
        return (struct1.angle < struct2.angle);
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
                    //cout << all.at(c).print << " is between " << all.at(a).print << " and " << all.at(b).print << endl;
                    viewable = false;
                    break;
                }
            }
            if (viewable)
            {
                //cout << "?" << endl;
                all.at(a).viewable++;
            }
            else
            {
                //all.at(a).notviewable.push_back(all.at(b));
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
    point highest = calcedasts.at(0);
    for (int x = 1; x < calcedasts.size(); x++)
    {
        //cout << calcedasts.at(x).viewable << endl;
        if (calcedasts.at(x).viewable > highest.viewable)
        {
            highest = calcedasts.at(x);
        }
    }
    //cout << asts.size() << endl;
    cout << highest.print << " " << highest.viewable << endl;
    for (int x = 0; x < calcedasts.size(); x++)
    {
        if (highest == calcedasts.at(x))
        {
            calcedasts.at(x).destroyed = true;
        }
        calcedasts.at(x).distance = distance(calcedasts.at(x), highest);
        calcedasts.at(x).setAngle(highest);
    }
    sort(calcedasts.begin(), calcedasts.end(), sortpoints());
    for (int x = 0; x < calcedasts.size(); x++)
    {
        cout << calcedasts.at(x).output() << endl;
    }
    return 0;
}