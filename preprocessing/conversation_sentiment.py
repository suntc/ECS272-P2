import json
from textblob import TextBlob, Word

def get_polarity():
    with open('conversation_dict.json', 'r') as infile:
        conversation_dict = json.load(infile)
        infile.close()

    with open('line_dict.json', 'r') as infile:
        line_dict = json.load(infile)
        infile.close()
    
    movie_sentiment_dict = {}
    for pair in conversation_dict:
        mid = conversation_dict[pair]['movie']
        movie_sentiment_dict.setdefault(mid, {})
        movie_sentiment_dict[mid].setdefault(pair, [])
        convs = conversation_dict[pair]['lines']
        for cl in convs:
            cdict = {}
            cdict['lines'] = cl
            ctext_list = [line_dict[l]['text'] for l in cl]
            ctext = " ".join(ctext_list)
            ctext_blob = TextBlob(ctext)
            cdict['polarity'] = ctext_blob.sentiment[0]
            cdict['subjectivity'] = ctext_blob.sentiment[1]
            movie_sentiment_dict[mid][pair].append(cdict)

    with open('movie_sentiment_dict.json', 'w') as outfile:
        json.dump(movie_sentiment_dict, outfile)
        outfile.close() 


def main():
    get_polarity()

if __name__ == '__main__':
    main()