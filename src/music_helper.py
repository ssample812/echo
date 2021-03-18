from music21.stream import Score
from music21.musicxml.xmlToM21 import MusicXMLImporter
from music21.musicxml.m21ToXml import GeneralObjectExporter
import xml.etree.ElementTree as ET
import os


# Temporary variables for path, will need to change for the Lambda
# default_path = "/Users/samanthasample/Documents/College/Capstone/echo/src"
blank_score_file = 'blank_score.musicxml'


'''
Parses a musicXML string into a music21 Score object

:param xml_string: musicXML string
:return: :class:`music23.stream.Score object`
'''
def musicxml_to_m21(xml_string: str) -> Score:
    mx = MusicXMLImporter()

    if not xml_string:
        return mx.scoreFromFile(blank_score_file)

    xml_root = ET.fromstring(xml_string)
    score = mx.xmlRootToScore(xml_root)
    return score


'''
Creates a musicXML string from a music21 Score object

:param score: :class:`music23.stream.Score object`
:return: musicXML String
'''
def m21_to_musicxml(score: Score) -> str:
    goe = GeneralObjectExporter()

    if not score:
        with open(blank_score_file) as f:
            return f.read()

    musicxml = goe.fromScore(score)
    return musicxml



# Temporary Testing


#I am commenting this out for the purpose of fixing the build...
# os.chdir(default_path)

# score = Score()
# print(m21_to_musicxml(score))

# with open(blank_score_file) as f:
#     music_xml = f.read()
#     print(musicxml_to_m21(music_xml))
