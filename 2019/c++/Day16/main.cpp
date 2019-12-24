#include "../utils.h"
vector<int> createPattern(int n, int length)
{
    int basePattern[] = {0, 1, 0, -1};
    vector<int> output;
    while (output.size() <= length)
    {
        for (int x = 0; x < 4; x++)
        {
            for (int y = 0; y < n; y++)
            {
                output.push_back(basePattern[x]);
            }
        }
    }
    output.erase(output.begin());
    return output;
}
int main()
{
    string input = "59719896749391372935980241840868095901909650477974922926863874668817926756504816327136638260644919270589305499504699701736406883012172909202912675166762841246709052187371758225695359676410279518694947094323466110604412184843328145082858383186144864220867912457193726817225273989002642178918584132902751560672461100948770988856677526693132615515437829437045916042287792937505148994701494994595404345537543400830028374701775936185956190469052693669806665481610052844626982468241111349622754998877546914382626821708059755592288986918651172943415960912020715327234415148476336205299713749014282618817141515873262264265988745414393060010837408970796104077";
    string baseinput = input;
    for (int x = 0; x < 9999; x++)
    {
        input += baseinput;
    }
    cout << baseinput.size() << " " << input.size() << endl;
    cout << (input.size() / baseinput.size()) << endl;
    int phases = 100;
    for (int x = 0; x < phases; x++)
    {
        string output;
        cout << "Phase " << x << endl;
        for (int y = 0; y < input.size(); y++)
        {
            //   cout << input.at(y) << " , " << endl;
            vector<int> pattern = createPattern((y + 1), input.size());
            int a = 0;
            for (int z = 0; z < input.size(); z++)
            {
                a += ((input.at(z) - '0') * pattern.at(z));
            }
            output += to_string(a).at(to_string(a).size() - 1);
            cout << "Phase " << x << " " << to_string(((double)y / (double)input.size()) * 100) << endl;
        }
        // cout << endl;
        input = output;
        //cout << input << endl;
    }
    cout << input << endl;
    cout << input.substr(stoi(input.substr(0, 7)), 8);
}