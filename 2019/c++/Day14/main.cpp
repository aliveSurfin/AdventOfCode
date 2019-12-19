#include "../utils.h"
#include <algorithm>
#include <math.h>
using namespace std;
class item
{
public:
    int ammount;
    string id;
    int ore;
    int needed;
    vector<item> componnents;
    bool operator==(const item &obj) const
    {
        return id == obj.id;
    }
    item(int a, string i)
    {
        id = i;
        ammount = a;
        ore = 0;
        needed = 0;
    }
    void update(vector<item> *all, int amt, int parentAmount = 1)
    {
        cout << this->id << endl;
        cout << amt << endl;
        cout << this->ammount << endl;
        //getchar();
        int a = amt;

        int b = a * parentAmount;
        cout << b << endl;
        while (b % ammount != 0)
        {
            b++;
        }
        cout << b << endl;
        getchar();
        this->needed += b;
        for (int x = 0; x < componnents.size(); x++)
        {
            vector<item>::iterator test = find(all->begin(), all->end(), componnents.at(x));
            if (test == all->end())
            {
                continue;
            }
            int i = distance(all->begin(), test);
            // for (int y = 0; y < amt; y++)
            // {
            all->at(i).update(all, this->componnents.at(x).ammount, amt);
            // }
        }
    }
    item(string a)
    {
        string cur = a.substr(a.find_first_of(">") + 2);
        if (cur != "")
        {
            string num = cur.substr(0, cur.find_first_of(" "));
            string id = cur.substr(cur.find_first_of(" "));
            num.erase(remove(num.begin(), num.end(), ' '), num.end());
            id.erase(remove(id.begin(), id.end(), ' '), id.end());
            this->id = id;
            this->ammount = stoi(num);
            this->ore = 0;
            this->needed = 0;
        }
    }
    void print(int level = 1)
    {
        cout << "ID: " + id + " needed: " + to_string(needed) << " ammt:  " << to_string(ammount) << "  | ";
        if (componnents.size() < 1)
        {
            if (level == 1)
            {
                cout << endl;
            }
            return;
        }
        cout << endl;
        cout << "    ";
        for (int x = 0; x < componnents.size(); x++)
        {
            int a = level + 1;
            componnents.at(x).print(a);
        }
        cout << endl;
    }
};
class conv
{
public:
    vector<item> inputs;
    item output;
    string raw;
    bool finished;
    conv(string parse, const item &output) : output(output)
    {
        finished = false;
        raw = parse;
        string lside;
        string rside;
        lside = parse.substr(0, parse.find_first_of('='));
        rside = parse.substr(parse.find_first_of(">") + 2);
        string cur = "";
        for (int x = 0; x < lside.size(); x++)
        {
            if (lside.at(x) == ',' && cur != "")
            {
                string num = cur.substr(0, cur.find_first_of(" "));
                string id = cur.substr(cur.find_first_of(" "));
                num.erase(remove(num.begin(), num.end(), ' '), num.end());
                id.erase(remove(id.begin(), id.end(), ' '), id.end());
                inputs.push_back(item(stoi(num), id));
                cur = "";
                x++;
            }
            else
            {
                cur += lside.at(x);
            }
        }
        if (cur != "")
        {
            string num = cur.substr(0, cur.find_first_of(" "));
            string id = cur.substr(cur.find_first_of(" "));
            num.erase(remove(num.begin(), num.end(), ' '), num.end());
            id.erase(remove(id.begin(), id.end(), ' '), id.end());
            inputs.push_back(item(stoi(num), id));
            cur = "";
        }
    }
    void print()
    {
        cout << raw << endl;
    }
};
int main()
{
    Utils utils;
    vector<string> a = utils.loadFile("input.txt");
    /**
     * for each conversion
     * find / add to items
     * increment by how much of them you need
     * update func ? 
     * update one by num
     * then update it's componnents in items recursively
     * */
    vector<conv> convs;
    for (int x = 0; x < a.size(); x++)
    {
        convs.push_back(conv(a.at(x), item(a.at(x))));
    }
    vector<item> *items = new vector<item>;
    for (int x = 0; x < convs.size(); x++)
    {
        item i = convs.at(x).output;
        for (int y = 0; y < convs.at(x).inputs.size(); y++)
        {
            i.componnents.push_back(convs.at(x).inputs.at(y));
        }
        items->push_back(i);
        // items->at(items->size() - 1).print();
    }
    //return 0;

    items->push_back(item(1, "ORE"));
    for (int x = 0; x < items->size(); x++)
    {
        if (items->at(x).id == "FUEL")
        {
            items->at(x).update(items, items->at(x).ammount);
        }
    }
    for (int x = 0; x < items->size(); x++)
    {
        items->at(x).print();
    }
    int ore = 0;
    // for (int x = 0; x < items->size(); x++)
    // {
    //     // items->at(x).print();
    //     if (items->at(x).componnents.at(0).id == "ORE")
    //     {
    //         cout << items->at(x).id << endl;
    //         cout << items->at(x).needed << endl;
    //         cout << items->at(x).ammount << endl;
    //         int a = items->at(x).needed;
    //         while (a % items->at(x).ammount != 0)
    //         {
    //             a++;
    //         }
    //         cout << "ore : ";
    //         cout << a * ((double)items->at(x).componnents.at(0).ammount / (double)items->at(x).ammount) << endl;
    //         ore += a * ((double)items->at(x).componnents.at(0).ammount / (double)items->at(x).ammount);
    //         //while(a%items)
    //     }
    // }
    cout << ore << endl;
}