#include <stdlib.h>
#include <stdio.h>
int main()
{
    FILE *fp;
    char *line = NULL;
    size_t len = 0;
    size_t read;
    int max = 1000; // no longer const
    int *intArray = malloc(max * sizeof(int));
    fp = fopen("input.txt", "r");
    int total1 = 0;
    int total2 = 0;
    while ((read = getline(&line, &len, fp)) != -1)
    {
        int a = 0.0;
        a = atoi(line);
        a = (a / 3) - 2;
        total1 += a;
        total2 += a;
        while (a > 11)
        {
            a = (a / 3) - 2;

            total2 += a;
        }
    }
    printf("%d %d", total1, total2);
    fclose(fp);
    return 0;
}