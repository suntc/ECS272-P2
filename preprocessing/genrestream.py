import json
from collections import OrderedDict

'''
biography   16
western   10
sci-fi   41
family   11
adult   1
comedy   49
film-noir   4
thriller   49
sport   8
romance   51
short   4
history   15
mystery   39
musical   8
music   11
drama   68
fantasy   30
action   36
adventure   38
horror   42
war   21
animation   13
documentary   3
'''

with open('movie_dict.json', 'r') as infile:
    moive_dict = json.load(infile)
    infile.close()

with open('genre_dict.json', 'r') as infile:
    genre_dict = json.load(infile)
    infile.close()

def genre_list():
    genre_dict = {}
    for m in moive_dict:
        year = int(moive_dict[m]['year'])
        for g in moive_dict[m]['genre']:
            genre_dict.setdefault(g, {})
            genre_dict[g].setdefault(year, [])
            genre_dict[g][year].append(m)
    for g in genre_dict:
        genre_dict[g] = OrderedDict(sorted(genre_dict[g].items()))

    for g in genre_dict:
        print(g, " ", len(genre_dict[g].keys()))

    with open('genre_dict.json', 'w') as outfile:
        json.dump(genre_dict, outfile)
        outfile.close()

def stackedList():
    min_year = 1950
    max_year = 2010
    key_list = ['sci-fi', 'comedy', 'thriller', 'romance', 'drama', 'action', 'adventure', 'horror']
    stack_list = [None] * (max_year - min_year + 2)
    stack_movie_list = [None] * (max_year - min_year + 2)
    for i in range(len(stack_list)):
        stack_list[i] = {'sci-fi': 0, 'comedy': 0, 'thriller': 0, 'romance': 0, 'drama': 0, 'action': 0, 'adventure': 0, 'horror': 0}
        stack_movie_list[i] = {'sci-fi': [], 'comedy': [], 'thriller': [], 'romance': [], 'drama': [], 'action': [], 'adventure': [], 'horror': []}
    for key in key_list:
        for year in genre_dict[key]:
            if int(year) < min_year:
                # stack_list[0][key] += len(genre_dict[key][year])
                # stack_movie_list[0][key] += genre_dict[key][year]
            else:
                stack_list[int(year)-min_year + 1][key] += len(genre_dict[key][year])
                stack_movie_list[int(year)-min_year + 1][key] += genre_dict[key][year]
    # print(stack_list)
    # print(stack_movie_list)
    with open('stack_list.json', 'w') as outfile:
        json.dump(stack_list, outfile)
        outfile.close()
    with open('stack_movie_list.json', 'w') as outfile:
        json.dump(stack_movie_list, outfile)
        outfile.close()

def main():
    #genre_list()
    stackedList()

if __name__ == '__main__':
    main()