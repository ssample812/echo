import re
from datetime import datetime
from unittest import TestCase

from music21.musicxml.xmlToM21 import MusicXMLImporter
from music21.note import Note
from music21.stream import Score
from src.music_helper import m21_to_musicxml, musicxml_to_m21


blank_score_file = 'src/blank_score.musicxml'
test_score_file = 'tests/test_score.musicxml'


class TestSongsHandler(TestCase):
    def test_musicxml_to_m21_invalid_xml(self):
        self.assertEqual(musicxml_to_m21('not musicxml'), None)

    def test_musicxml_to_m21_invalid_template(self):
        self.assertEqual(musicxml_to_m21('blank_score', 'not a file'), None)

    def test_musicxml_to_m21_no_template_success(self):
        with open(blank_score_file) as f:
            blank_score = f.read()
            score = musicxml_to_m21(blank_score)
            self.assertEqual(type(score), type(Score()))

    def test_musicxml_to_m21_success(self):
        # test score should have one note in the first measure
        score = musicxml_to_m21('', test_score_file)
        element = score.parts[0].measure(1).elements[3]
        self.assertEqual(type(element), type(Note()))

    def test_m21_to_musicxml_invalid_score(self):
        self.assertEqual(m21_to_musicxml('not a score'), '')

    def test_m21_to_musicxml_no_score_success(self):
        with open(blank_score_file) as f:
            blank_score = f.read()
            self.assertEqual(m21_to_musicxml(), blank_score)

    def test_m21_to_musicxml_success(self):
        mx = MusicXMLImporter()

        test_score = mx.scoreFromFile(test_score_file)
        result_xml = m21_to_musicxml(test_score).strip()

        with open(test_score_file) as f:
            test_xml = f.read()

            # Change test_score encoding date to today's date
            now = datetime.now()
            date = now.strftime('%Y-%m-%d')
            new_encoding = '<encoding-date>' + date + '</encoding-date>\n      <software>music21 v.6.7.1</software>'
            pattern = r'<encoding-date>(.*?)</encoding-date>'
            test_xml = re.sub(pattern, new_encoding, test_xml).strip()

            self.assertEqual(result_xml, test_xml)
