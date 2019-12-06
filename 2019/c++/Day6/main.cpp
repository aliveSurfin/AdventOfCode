#include "../utils.h"
int total =0;
int youandsan = 2147000000;
int part2 = 0;
class orbit
{
public:
    string parent;
    int orbits;
    vector<orbit> suborbits;
    string name;
    orbit(string a, int b, string c)
    {
        parent = c;
        name = a;
        orbits = b;
    }

    bool find(string label)
    {
        if (name == label)
        {
            return true;
        }
        for (int x = 0; x < suborbits.size(); x++)
        {
            if (suborbits.at(x).find(label))
            {
                return true;
            }
        }
        return false;
    }

    int getOrbits(string label)
    {
        if (name == label)
        {
            return orbits;
        }
        for (int x = 0; x < suborbits.size(); x++)
        {
            if (suborbits.at(x).find(label))
            {
                return suborbits.at(x).getOrbits(label);
            }
        }
        return -1;
    }
    void insert(string parent, string child, int orbits) //find to be called before
    {
        orbits++;
        if (name == parent)
        {
            total += orbits; // part 1
            suborbits.push_back(orbit(child, orbits, parent));
        }
        for (int x = 0; x < suborbits.size(); x++)
        {
            suborbits.at(x).insert(parent, child, orbits);
        }
    }
};
void traverse(orbit o)
{
    if (o.find("YOU") && o.find("SAN"))
    {
        int b = (o.getOrbits("YOU") + o.getOrbits("SAN")) - (o.orbits * 2);
        if (b < youandsan)
        {
            youandsan = b;
        }

        for (int x = 0; x < o.suborbits.size(); x++)
        {
            traverse(o.suborbits.at(x));
        }
    }
}
int main()
{
    vector<string> input;
    Utils utils;
    input = utils.loadFile("input.txt");
    orbit orbits("COM", 0, "");
    vector<string> newInput = input;
    do
    {
        input = newInput;
        newInput.clear();
        for (int x = 0; x < input.size(); x++)
        {
            int pos = input.at(x).find_first_of(')');

            if (orbits.find(input.at(x).substr(0, pos)))
            {
                orbits.insert(input.at(x).substr(0, pos), input.at(x).substr(pos + 1), orbits.orbits);
            }
            else
            {
                newInput.push_back(input.at(x));
            }
        }
    } while (newInput.size() != 0);
    traverse(orbits);
    //find hop length
    cout << "PART 1 : " << total << endl;
    cout << "PART 2 : " << youandsan - 2 << endl;

    return 0;
}