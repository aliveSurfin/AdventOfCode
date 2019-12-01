#include <map>
#include "utils.h"
#include <fstream>
#include <iostream>
#include <vector>
using namespace std;
vector<string> Utils::loadFile(string filename)
{
    vector<string> output;
    fstream fin(filename, fstream::in);
    if (!fin.is_open())
    {
        cout << "CANNOT LOAD " << filename << endl;
        exit(1);
    }
    string line;
    while (getline(fin, line))
    {
        output.push_back(line);
    }
    cout << "File Length: " << to_string((int)output.size()) << endl;
    return output;
}