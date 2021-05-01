import xml.etree.ElementTree as ET

from music21.musicxml.m21ToXml import GeneralObjectExporter
from music21.musicxml.xmlToM21 import MusicXMLImporter
from music21.stream import Score
from music21.midi.translate import streamToMidiFile
from music21.midi import MidiFile
from midi2audio import FluidSynth


blank_score_file = 'src/blank_score.musicxml'


'''
Parses a musicXML string into a music21 Score object

:param xml_string: musicXML string
:param template_file: file path with musicxml starter template, optional
:return: :class:`music23.stream.Score` object
'''
def musicxml_to_m21(xml_string: str, template_file: str = None) -> Score:
    mx = MusicXMLImporter()

    if not xml_string:
        if template_file:
            return mx.scoreFromFile(template_file)
        return mx.scoreFromFile(blank_score_file)

    try:
        xml_root = ET.fromstring(xml_string)
        score = mx.xmlRootToScore(xml_root)
        return score
    except Exception:
        return None


'''
Creates a musicXML string from a music21 Score object

:param score: :class:`music23.stream.Score` object, optional
:return: musicXML string
'''
def m21_to_musicxml(score: Score = None) -> str:
    if not score:
        with open(blank_score_file) as f:
            return f.read()

    try:
        goe = GeneralObjectExporter(score)
        byte_str = goe.parse()
        xml_str = byte_str.decode('utf-8').strip()
        return xml_str
    except Exception:
        return ''
