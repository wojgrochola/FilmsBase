import xml.etree.ElementTree as ET
import unittest

ll = []


class Parser:
    def __init__(self):
        self.tuple_list = []
        self.tree =  ET.parse('Books.xml')
    def parseBook(self):
        root = self.tree.getroot()


        for book in root.findall('book'):
            t = (book.get('id'), 
                book.find('author').text, 
                book.find('title').text, 
                book.find('genre').text, 
                book.find('price').text, 
                book.find('publish_date').text, 
                book.find('description').text)
            self.tuple_list.append(t)
        return self.tuple_list
    def printParse(self):
        print(self.tuple_list[0])
        for i in self.tuple_list:
            print('_id: ',i[0])
            print('    --> author: ', i[1])
            print('    --> title: ', i[2])
            print('    --> genre: ', i[3])

class TestStringMethods(unittest.TestCase):

  def dataValidTest(self):
      self.assertEqual(ll[0][0], 'bk101')
      self.assertEqual(ll[1][0], 'bk102')
      self.assertEqual(ll[2][0], 'bk103')
      self.assertEqual(ll[3][0], 'bk104')



if __name__ == '__main__':
    p = Parser()
    ll = p.parseBook()
    print(ll[0])
    unittest.main()
    # p.printParse()