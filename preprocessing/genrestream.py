import json
from collections import OrderedDict

with open('movie_dict.json', 'r') as infile:
    moive_dict = json.load(infile)
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


def main():
    genre_list()

if __name__ == '__main__':
    main()