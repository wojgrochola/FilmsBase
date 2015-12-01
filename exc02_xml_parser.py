import xml.etree.ElementTree as ET
import unittest, sys



class Parser:

    def __init__(self, name):

        self.name = name
        self.catalog = []

    def parseXml(self):
        try:
            self.tree = ET.parse(self.name)
        except:
            print (sys.exc_info()[0])
            sys.exit(0)

    def run(self):
        self.parseXml()
        root = self.tree.getroot()

        for child in root:
            childElements = []
            for innerChild in child:
                childElements.append(innerChild.text)
            self.catalog.append(childElements)

        return self.catalog

    def __repr__(self):
        out = ''
        for i in self.catalog:
            out += '_id: ' + i[0] + '\n'
            out +='    --> author: ' +  i[1] + '\n'
            out += '    --> title: ' +  i[2] + '\n'
            out += '    --> genre: ' +  i[3] + '\n'

        return out

if __name__ == '__main__':
    p = Parser('Books.xml')
    p.run()
    print (p)

