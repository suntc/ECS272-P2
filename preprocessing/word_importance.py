import json
from textblob import TextBlob, Word

'''
only consider nouns, verbs and adjs
inverse query: word --> line
'''

stop_words = {'ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how', 'further', 'was', 'here', 'than'}

def get_useful_tag(t):
    vt = ['VB', 'VBD', 'VBG', 'VBN', 'VBP', 'VBZ']
    jt = ['JJ', 'JJR', 'JJS']
    nt = ['NN', 'NNS', 'NNP', 'NNPS']
    if t in vt:
        return 'v'
    elif t in jt:
        return 'jj'
    elif t in nt:
        return 'n'
    else:
        return False

def is_stop(w):
    w = w.lower()
    if w in stop_words or "'" in w:
        return True


def go_through_conversations():
    with open('conversation_dict.json', 'r') as infile:
        cv_dict = json.load(infile)
        infile.close()

def go_lines():
    movie_word_dict = {}
    with open('line_dict.json', 'r') as infile:
        line_dict = json.load(infile)
        infile.close()
    count = 0
    for key in line_dict:
        count += 1
        if count % 10000 == 9999:
            print(count)
        mid = line_dict[key]['movie']
        movie_word_dict.setdefault(mid, {})
        mline = TextBlob(line_dict[key]['text'])
        words = mline.words
        tags = mline.tags
        for i, t in enumerate(tags):
            w = Word(t[0].lower())
            utag = get_useful_tag(t[1])
            if utag == False:
                continue
            wlemma = w.lemmatize(t[1])
            if is_stop(wlemma):
                continue
            movie_word_dict[mid].setdefault(wlemma, {'count':0, 'line': []})
            movie_word_dict[mid][wlemma]['count'] += 1
            movie_word_dict[mid][wlemma]['line'].append(key)
    
    with open('movie_word_dict.json', 'w') as outfile:
        json.dump(movie_word_dict, outfile)
        outfile.close() 

def main():
    go_lines()

if __name__ == '__main__':
    main()