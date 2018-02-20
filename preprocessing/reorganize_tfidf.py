import json
'''
accidentally lost the original script...
'''

wlimit = 50

def reorganize():
    with open('movie_tfidf_dict.json', 'r') as infile:
        tfidf_dict = json.load(infile)
        infile.close()
    movie_tfidf_list = {}
    for mid in tfidf_dict:
        movie_tfidf_list.setdefault(mid, [])
        for word in tfidf_dict[mid]:
            wd = tfidf_dict[mid][word]
            wd.update({'word': word})
            movie_tfidf_list[mid].append(wd)
        ## sort
        movie_tfidf_list[mid].sort(key=lambda k: k['value'], reverse=True)
        movie_tfidf_list[mid] = movie_tfidf_list[mid][: wlimit]

    with open('movie_tfidf_list.json', 'w') as outfile:
        json.dump(movie_tfidf_list, outfile)
        outfile.close() 

def main():
    reorganize()

if __name__ == '__main__':
    main()