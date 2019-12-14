#include "../utils.h"
#include <cmath>
#include <bits/stdc++.h>
class axis
{
public:
    int pos1;
    int pos1vel;
    int pos2;
    int pos2vel;
    int pos3;
    int pos3vel;
    int pos4;
    int pos4vel;
    axis(int a, int b, int c, int d, int e, int f, int g, int h)
    {
        pos1 = a;
        pos1vel = b;
        pos2 = c;
        pos2vel = d;
        pos3 = e;
        pos3vel = f;
        pos4 = g;
        pos4vel = h;
    }
    bool operator==(const axis &obj) const
    {
        return (pos1 == obj.pos1 && pos1vel == obj.pos1vel && pos2 == obj.pos2 && pos2vel == obj.pos2vel &&
                pos3 == obj.pos3 && pos3vel == obj.pos3vel && pos4 == obj.pos4 && pos4vel == obj.pos4vel);
    }
};
class hashAxis
{
public:
    int prime1 = 54059;
    int prime2 = 76963;
    int prime3 = 86969;

    size_t operator()(const axis &a) const
    {
        string b = (to_string(a.pos1) + to_string(a.pos1vel) + to_string(a.pos2) + to_string(a.pos2vel) + to_string(a.pos3) + to_string(a.pos3vel) + to_string(a.pos4) + to_string(a.pos4vel));
        size_t h = 37;
        for (int x = 0; x < b.size(); x++)
        {
            h = (h * prime1) ^ (b.at(x) * prime2);
        }
        return h;
    }
};
class pos
{
public:
    int x;
    int y;
    int z;
    int xvel;
    int yvel;
    int zvel;
    long int potential;
    long int kinetic;
    bool operator==(const pos &oth)
    {
        return (x == oth.x && y == oth.y && z == oth.z);
    }
    bool operator!=(const pos &oth)
    {
        return (x != oth.x && y != oth.y && z != oth.z);
    }
    long int calcPotAndKin()
    {
        kinetic = abs(abs(xvel) + abs(yvel) + abs(zvel));
        potential = abs(abs(x) + abs(y) + abs(z));
        return kinetic * potential;
    }
    pos(int xi, int yi, int zi)
    {
        x = xi;
        y = yi;
        z = zi;
        xvel = 0;
        yvel = 0;
        zvel = 0;
    }
    pos()
    {
    }
};
class moon
{
public:
    pos basestate;
    pos curstate;
    string display()
    {
        string out = "";
        out += "pos: ";
        out += +" x| " + to_string(curstate.x) + " y| " + to_string(curstate.y) + " z| " + to_string(curstate.z);
        out += "     vel: ";
        out += +" x| " + to_string(curstate.xvel) + " y| " + to_string(curstate.yvel) + " z| " + to_string(curstate.zvel);
        return out;
    }
    bool initstate()
    {
        if (curstate.x == basestate.x && curstate.y == basestate.y && curstate.z == curstate.z)
        {
            if (curstate.xvel == basestate.xvel && curstate.yvel == basestate.yvel && curstate.zvel == basestate.zvel)
            {
                return true;
            }
        }
        return false;
    }
    int calcVel(int me, int other)
    {
        if (me == other)
        {
            return 0;
        }
        else if (me < other)
        {
            return 1;
        }
        else
        {
            return -1;
        }
    }
    void calcAllVel(vector<moon> moons)
    {
        for (int x = 0; x < moons.size(); x++)
        {
            if (curstate == moons.at(x).curstate)
            {
                continue;
            }
            curstate.xvel += calcVel(curstate.x, moons.at(x).curstate.x);
            curstate.yvel += calcVel(curstate.y, moons.at(x).curstate.y);
            curstate.zvel += calcVel(curstate.z, moons.at(x).curstate.z);
        }
    }
    void calcIndVel(int axis, vector<moon> moons)
    {
        for (int x = 0; x < moons.size(); x++)
        {
            if (curstate == moons.at(x).curstate)
            {
                continue;
            }
            switch (axis)
            {
            case 0:
                curstate.xvel += calcVel(curstate.x, moons.at(x).curstate.x);
                break;
            case 1:
                curstate.yvel += calcVel(curstate.y, moons.at(x).curstate.y);
                break;
            case 2:
                curstate.zvel += calcVel(curstate.z, moons.at(x).curstate.z);
                break;
            }
        }
    }
    void applyIndVel(int axis)
    {
        switch (axis)
        {
        case 0:
            curstate.x += curstate.xvel;
            break;
        case 1:
            curstate.y += curstate.yvel;
            break;
        case 2:
            curstate.z += curstate.zvel;
            break;
        }
    }
    void applyVel()
    {
        curstate.x += curstate.xvel;
        curstate.y += curstate.yvel;
        curstate.z += curstate.zvel;
    }
    moon(int xi, int yi, int zi)
    {
        curstate = pos(xi, yi, zi);
        basestate = curstate;
    }
};
vector<moon> parseMoons(vector<string> input)
{
    vector<moon> output;
    //cout << input.size() << endl;
    for (int x = 0; x < input.size(); x++)
    {
        string cur = input.at(x);
        vector<string> raw;
        string a = "";
        for (int y = 0; y < cur.size(); y++)
        {
            if (cur.at(y) == ',')
            {
                if (a != "")
                {
                    raw.push_back(a);
                    a = "";
                }
            }
            else
            {
                a += cur.at(y);
            }
        }
        if (a != "")
        {
            raw.push_back(a);
        }
        for (int x = 0; x < raw.size(); x++)
        {
            string o = "";
            for (int y = 0; y < raw.at(x).size(); y++)
            {
                char q = raw.at(x).at(y);
                if (q == '<' || q == '>' || q == ' ' || q == '=' || q == 'x' || q == 'y' || q == 'z')
                {
                    continue;
                }
                o += q;
            }
            raw.at(x) = o;
        }

        output.push_back(moon(stoi(raw.at(0)), stoi(raw.at(1)), stoi(raw.at(2))));
    }
    return output;
}

int part1()
{
    Utils utils;
    vector<moon> moons = parseMoons(utils.loadFile("input.txt"));
    cout << "STEP 0" << endl;
    for (int x = 0; x < moons.size(); x++)
    {
        cout << moons.at(x).display() << endl;
    }
    cout << "______________________________________________________________" << endl;
    long long int i = 1;
    while (i <= 1000)
    {
        cout << "STEP " << i << endl;
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).calcAllVel(moons);
        }
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).applyVel();
            cout << moons.at(x).display() << endl;
        }

        i++;
    }
    cout << "OVER in " << i << endl;
    int totalEnergy = 0;
    for (int x = 0; x < moons.size(); x++)
    {
        totalEnergy += moons.at(x).curstate.calcPotAndKin();
        cout << moons.at(x).display() << endl;
    }
    cout << "TOTAL ENERGY " << totalEnergy << endl;
    return totalEnergy;
}
long long int gcd(long long int a, long long int b)
{
    if (a == 0)
    {
        return b;
    }
    if (b == 0)
    {
        return a;
    }
    if (a == b)
    {
        return a;
    }
    if (a > b)
    {
        return gcd(a - b, b);
    }
    return gcd(a, b - a);
}
long long int lcm(long long int a, long long int b)
{
    return (a * b) / gcd(a, b);
}
int part2()
{
    Utils utils;
    vector<moon> moons = parseMoons(utils.loadFile("input.txt"));
    long long int i = 0;
    unordered_set<axis, hashAxis> set;
    while (true)
    {
        if (set.find(axis(moons[0].curstate.x, moons[0].curstate.xvel, moons[1].curstate.x, moons[1].curstate.xvel,
                          moons[2].curstate.x, moons[2].curstate.xvel, moons[3].curstate.x, moons[3].curstate.xvel)) != set.end())
        {
            break;
        }
        set.insert(axis(moons[0].curstate.x, moons[0].curstate.xvel, moons[1].curstate.x, moons[1].curstate.xvel,
                        moons[2].curstate.x, moons[2].curstate.xvel, moons[3].curstate.x, moons[3].curstate.xvel));
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).calcIndVel(0, moons);
        }
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).applyIndVel(0);
        }

        i++;
    }
    long long int xaxis = i;
    i = 0;
    set.clear();
    while (true)
    {
        if (set.find(axis(moons[0].curstate.y, moons[0].curstate.yvel, moons[1].curstate.y, moons[1].curstate.yvel,
                          moons[2].curstate.y, moons[2].curstate.yvel, moons[3].curstate.y, moons[3].curstate.yvel)) != set.end())
        {
            break;
        }
        set.insert(axis(moons[0].curstate.y, moons[0].curstate.yvel, moons[1].curstate.y, moons[1].curstate.yvel,
                        moons[2].curstate.y, moons[2].curstate.yvel, moons[3].curstate.y, moons[3].curstate.yvel));
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).calcIndVel(1, moons);
        }
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).applyIndVel(1);
        }

        i++;
    }
    long long int yaxis = i;
    i = 0;
    set.clear();
    while (true)
    {
        if (set.find(axis(moons[0].curstate.z, moons[0].curstate.zvel, moons[1].curstate.z, moons[1].curstate.zvel,
                          moons[2].curstate.z, moons[2].curstate.zvel, moons[3].curstate.z, moons[3].curstate.zvel)) != set.end())
        {
            break;
        }
        set.insert(axis(moons[0].curstate.z, moons[0].curstate.zvel, moons[1].curstate.z, moons[1].curstate.zvel,
                        moons[2].curstate.z, moons[2].curstate.zvel, moons[3].curstate.z, moons[3].curstate.zvel));
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).calcIndVel(2, moons);
        }
        for (int x = 0; x < moons.size(); x++)
        {
            moons.at(x).applyIndVel(2);
        }

        i++;
    }
    int zaxis = i;
    cout << xaxis << endl;
    cout << yaxis << endl;
    cout << zaxis << endl;
    cout << lcm(xaxis, lcm(yaxis, zaxis)) << endl;
}
int main()
{
    part1();
    part2();
}