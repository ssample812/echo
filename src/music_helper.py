import xml.etree.ElementTree as ET

from music21.musicxml.m21ToXml import GeneralObjectExporter
from music21.musicxml.xmlToM21 import MusicXMLImporter
from music21.stream import Score
from music21.midi.translate import streamToMidiFile
from music21.midi import MidiFile
from midi2audio import FluidSynth
from pydub import AudioSegment


blank_score_file = 'src/blank_score.musicxml'


'''
Parses a musicXML string into a music21 Score object

:param xml_string: musicXML string
:return: :class:`music23.stream.Score` object
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

:param score: :class:`music23.stream.Score` object
:return: musicXML string
'''
def m21_to_musicxml(score: Score = None) -> str:
    if not score:
        with open(blank_score_file) as f:
            return f.read()

    goe = GeneralObjectExporter(score)
    byte_str = goe.parse()
    xml_str = byte_str.decode('utf-8').strip()
    return xml_str


'''
Creates a MIDI file from a musicXML string

:param xml_string: musicXML string
:return: MIDI file
'''
def musicxml_to_midi(xml_string: str) -> MidiFile:
    stream = musicxml_to_m21(xml_string)
    mf = streamToMidiFile(stream)
    return mf


'''
Creates an mp3 file from a MIDI file

:param midi: MIDI file
:return: mp3 file
'''
'''
def midi_to_mp3(midi: MidiFile) -> file:
    fs = FluidSynth()
    fs.midi_to_audio(midi, 'output.wav')
    sound = AudioSegment.from_file('output.wav', format = 'wav')
    sound.export('output.mp3', format = 'mp3')
'''
