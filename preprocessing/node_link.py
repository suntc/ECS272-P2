import json

def count_line(lines):
    count = 0
    for l in lines:
        count += len(l)
    return count

def gen_nodelink():
    nodelinks = {}
    with open('conversation_dict.json', 'r') as infile:
        cv_dict = json.load(infile)
        infile.close()

    with open('chara_dict.json', 'r') as infile:
        chara_dict = json.load(infile)
        infile.close()

    for pair in cv_dict:
        m_id = cv_dict[pair]['movie']
        c_id_1 = pair.split("-")[0]
        c_id_2 = pair.split("-")[1]
        lines = cv_dict[pair]['lines']
        nodelinks.setdefault(m_id, {})
        nodelinks[m_id].setdefault('nodes', {})
        nodelinks[m_id].setdefault('links', [])
        link = {}
        link['source'] = c_id_1
        link['target'] = c_id_2
        link['id'] = pair
        link['lines'] = lines
        link['linecount'] = count_line(lines)
        nodelinks[m_id]['links'].append(link)
        nodelinks[m_id]['nodes'].setdefault(c_id_1, {})
        nodelinks[m_id]['nodes'].setdefault(c_id_2, {})
        nodelinks[m_id]['nodes'][c_id_1] = chara_dict[c_id_1]
        nodelinks[m_id]['nodes'][c_id_2] = chara_dict[c_id_2]
    
    with open('nodelinks.json', 'w') as outfile:
        json.dump(nodelinks, outfile)
        outfile.close()

def main():
    gen_nodelink()

if __name__ == '__main__':
    main()