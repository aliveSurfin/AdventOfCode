#include "../utils.h"
#include <vector>
class picture
{
public:
    int width;
    int height;
    vector<vector<string>> layers; // layers of picture
    vector<string> outputLayer;
    picture(int x, int y)
    {
        width = x;
        height = y;
    }
    void loadPixels(vector<char> pixels)
    {
        int i = 0;
        int layer = 0;
        while (i < pixels.size() - 1)
        {
            vector<string> curlayer;
            // cout << "Layer " << (layers.size() + 1) << endl;
            for (int x = 0; x < height; x++)
            {
                string curString = "";

                for (int y = 0; y < width; y++)
                {

                    curString += pixels.at(i);
                    i++;
                }

                curlayer.push_back(curString);
            }
            layers.push_back(curlayer);
        }
    }
    void printLayers()
    {
        for (int x = 0; x < layers.size(); x++)
        {
            cout << "Layer : " << (x + 1) << endl;
            for (int y = 0; y < layers.at(x).size(); y++)
            {
                cout << layers.at(x).at(y) << endl;
            }
        }
    }
    int lowest0sOnLayer()
    {
        int lowestLayer;
        int lowestLayerCount = 2147000000; //max value

        for (int x = 0; x < layers.size(); x++)
        {
            int curLayerCount = 0;
            for (int y = 0; y < layers.at(x).size(); y++)
            {
                for (int z = 0; z < layers.at(x).at(y).size(); z++)
                {
                    if (layers.at(x).at(y).at(z) == '0')
                    {
                        curLayerCount++;
                    }
                }
            }
            if (curLayerCount < lowestLayerCount)
            {
                lowestLayer = x;
                lowestLayerCount = curLayerCount;
            }
        }
        return lowestLayer;
    }
    void get1times2()
    {
        int layer = lowest0sOnLayer();
        int count1 = 0;
        int count2 = 0;
        for (int x = 0; x < layers.at(layer).size(); x++)
        {
            cout << layers.at(layer).at(x) << endl;
            for (int y = 0; y < layers.at(layer).at(x).size(); y++)
            {
                if (layers.at(layer).at(x).at(y) == '1')
                {
                    count1++;
                }
                else if (layers.at(layer).at(x).at(y) == '2')
                {
                    count2++;
                }
            }
        }
        int output = count1 * count2;
        cout << count1 << " " << count2 << endl;
        cout << output << endl;
    }
    void createOutput()
    {
        for (int x = 0; x < height; x++)
        {
            outputLayer.push_back("");
            for (int y = 0; y < width; y++)
            {
                char cur;
                for (int a = 0; a < layers.size(); a++)
                {
                    if (layers.at(a).at(x).at(y) != '2')
                    {
                        cur = layers.at(a).at(x).at(y);
                        break;
                    }
                }
                outputLayer.at(outputLayer.size() - 1) += cur;
            }
        }
    }
    void printOutput()
    {
        for (int x = 0; x < outputLayer.size(); x++)
        {
            for (int y = 0; y < outputLayer.at(x).size(); y++)
            {
                if (outputLayer.at(x).at(y) == '1')
                {
                    cout << "#";
                }
                else
                {
                    cout << ".";
                }
            }
            cout << endl;
        }
    }
};
vector<char> parseInput(vector<string> input)
{
    vector<char> pixels;
    string a = "";
    for (int x = 0; x < input.size(); x++)
    {
        for (int y = 0; y < input.at(x).size(); y++)
        {

            if (input.at(x).at(y) == ' ' || input.at(x).at(y) == '\n')
            {
                continue;
            }

            pixels.push_back(input.at(x).at(y));
        }
    }
    return pixels;
}
int main()
{
    Utils utils;
    picture pic(25, 6);
    vector<string> input = utils.loadFile("input.txt");
    vector<char> pixels = parseInput(input);
    cout << pixels.size() << endl;
    pic.loadPixels(pixels);
    pic.get1times2();
    pic.createOutput();
    pic.printOutput();
    return 0;
}