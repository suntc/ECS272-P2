from pathlib import Path
import json

corpus_path = "./corpus"

def movie_data():
    seperator = " +++$+++ "
    movie_dict = {}
    with Path(corpus_path, 'movie_titles_metadata.txt').open('r', encoding='cp1252') as infile:
        for line in infile:
            print(line)
            metas = line.split(seperator)
            m_id = metas[0]
            m_title = metas[1].title()
            m_year = metas[2]
            m_score = metas[3]
            m_count = metas[4]
            m_genre = eval(metas[5])

            movie_dict.setdefault(m_id, {})
            movie_dict[m_id]['title'] = m_title
            movie_dict[m_id]['year'] = m_year
            movie_dict[m_id]['score'] = m_score
            movie_dict[m_id]['count'] = m_count
            movie_dict[m_id]['genre'] = m_genre
        
        infile.close()
    
    with open('movie_dict.json', 'w') as outfile:
        json.dump(movie_dict, outfile)
        outfile.close()

def chara_data():
    seperator = " +++$+++ "
    chara_dict = {}
    with Path(corpus_path, 'movie_characters_metadata.txt').open('r', encoding='cp1252') as infile:
        for line in infile:
            metas = line.split(seperator)
            c_id = metas[0]
            c_name = metas[1].title()
            m_id = metas[2]
            m_title = metas[3].title()
            c_gender = metas[4]
            c_credit = metas[5].strip('\n')

            chara_dict.setdefault(c_id, {})
            chara_dict[c_id]['name'] = c_name
            chara_dict[c_id]['movie'] = m_id
            chara_dict[c_id]['title'] = m_title
            chara_dict[c_id]['gender'] = c_gender
            chara_dict[c_id]['credit'] = c_credit
        
        infile.close()

    with open('chara_dict.json', 'w') as outfile:
        json.dump(chara_dict, outfile)
        outfile.close()

def line_data():
    seperator = " +++$+++ "
    line_dict = {}
    with Path(corpus_path, 'movie_lines.txt').open('r', encoding='cp1252') as infile:
        for line in infile:
            metas = line.split(seperator)
            l_id = metas[0]
            c_id = metas[1]
            m_id = metas[2]
            c_name = metas[3].title()
            l_text = metas[4].strip('\n')

            line_dict.setdefault(l_id, {})
            line_dict[l_id]['cid'] = c_id
            line_dict[l_id]['movie'] = m_id
            line_dict[l_id]['name'] = c_name
            line_dict[l_id]['text'] = l_text
        
        infile.close()

    with open('line_dict.json', 'w') as outfile:
        json.dump(line_dict, outfile)
        outfile.close()

def conversation_data():
    seperator = " +++$+++ "
    cv_dict = {}
    with Path(corpus_path, 'movie_conversations.txt').open('r', encoding='cp1252') as infile:
        for line in infile:
            metas = line.split(seperator)
            c_id_1 = metas[0]
            c_id_2 = metas[1]
            m_id = metas[2]
            lines = eval(metas[3])
            cv_id = c_id_1 + "-" + c_id_2
            cv_dict.setdefault(cv_id, {})
            cv_dict[cv_id].setdefault('movie', m_id)
            cv_dict[cv_id].setdefault('lines', [])
            cv_dict[cv_id]['lines'].append(lines)
        
        infile.close()

    with open('conversation_dict.json', 'w') as outfile:
        json.dump(cv_dict, outfile)
        outfile.close()

def main():
    #movie_data()
    #chara_data()
    line_data()
    conversation_data()

if __name__ == '__main__':
    main()