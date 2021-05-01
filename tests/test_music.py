from unittest import TestCase

from music21.tie import Tie
from src.music import (create_blank_song, create_note, create_rest, create_tie,
                       fix_old_ties, handle_update_request, insert_note,
                       rename_song, update_composer)
from src.music_helper import musicxml_to_m21


class TestMusic(TestCase):
    def setUp(self):
        self.score = musicxml_to_m21('')

    def test_create_blank_song_success(self):
        song = create_blank_song()
        self.assertEqual(song.metadata.title, 'New Song')

    def test_create_note_success(self):
        note = create_note('C4', 2.0)
        self.assertEqual(note.duration.quarterLength, 2.0)

    def test_create_rest_success(self):
        rest = create_rest(2.0)
        self.assertEqual(rest.duration.quarterLength, 2.0)

    def test_rename_song_success(self):
        rename_song('New Title', self.score)
        self.assertEqual(self.score.metadata.title, 'New Title')

    def test_update_composer_success(self):
        update_composer('New Composer', self.score)
        self.assertEqual(self.score.metadata.composer, 'New Composer')

    def test_create_tie_two_notes_success(self):
        note1 = create_note('C4', 1.0)
        note2 = create_note('C4', 2.0)
        notes = [note1, note2]
        create_tie(notes)
        self.assertEqual(note1.tie.type, 'start')
        self.assertEqual(note2.tie.type, 'stop')

    def test_create_tie_success(self):
        note1 = create_note('C4', 1.0)
        note2 = create_note('C4', 2.0)
        note3 = create_note('C4', 1.0)
        notes = [note1, note2, note3]
        create_tie(notes)
        self.assertEqual(note1.tie.type, 'start')
        self.assertEqual(note2.tie.type, 'continue')
        self.assertEqual(note3.tie.type, 'stop')

    def test_fix_old_ties_no_change_success(self):
        note1 = create_note('C4', 2.0)
        note1.tie = Tie('start')
        note2 = create_note('C4', 2.0)
        note2.tie = Tie('stop')
        note3 = create_note('F5', 4.0)
        self.score.parts[0].measure(1).clear()
        self.score.parts[0].measure(2).clear()
        self.score.parts[0].measure(1).insert(0, note1)
        self.score.parts[0].measure(1).insert(2, note2)
        self.score.parts[0].measure(2).insert(0, note3)
        fix_old_ties(self.score, [note3])
        self.assertEqual(note1.tie.type, 'start')
        self.assertEqual(note2.tie.type, 'stop')

    def test_fix_old_ties_success(self):
        note1 = create_note('C4', 4.0)
        note1.tie = Tie('start')
        note2 = create_note('F5', 4.0)
        self.score.parts[0].measure(1).clear()
        self.score.parts[0].measure(2).clear()
        self.score.parts[0].measure(1).insert(0, note1)
        self.score.parts[0].measure(2).insert(0, note2)
        fix_old_ties(self.score, [note2])
        self.assertEqual(note1.tie, None)

    def test_insert_note_missing_parameters(self):
        insert_note(self.score, 'C4', -1, 0)
        score_elements = self.score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 0)

    def test_insert_note_invalid_parameters(self):
        insert_note(self.score, 'C4', 0, 0)
        score_elements = self.score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 0)

    def test_insert_note_rest_success(self):
        insert_note(self.score, 'R', 2, 2)
        score_elements = self.score.recurse(classFilter=('Rest'))
        # Scores start with 4 rests, 5 means we added one
        self.assertEqual(len(score_elements), 5)

    def test_insert_note_success(self):
        insert_note(self.score, 'C4', 2, 2)
        score_elements = self.score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 1)

    def test_handle_update_request_invalid_note_request(self):
        request_dict = {'note': {'pitch': 'C5', 'duration': 2}}
        new_score = handle_update_request(request_dict, self.score)
        score_elements = new_score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 0)

    def test_handle_update_request_title_success(self):
        request_dict = {'title': 'Summertime'}
        new_score = handle_update_request(request_dict, self.score)
        self.assertEqual(new_score.metadata.title, 'Summertime')

    def test_handle_update_request_multiple_notes_success(self):
        request_dict = {'note': [{'pitch': 'C5', 'position': 2, 'duration': 2},
            {'pitch': 'F5', 'position': 8, 'duration': 2}]}
        new_score = handle_update_request(request_dict, self.score)
        score_elements = new_score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 2)

    def test_handle_update_request_one_note_success(self):
        request_dict = {'note': {'pitch': 'C5', 'position': 2, 'duration': 2}}
        new_score = handle_update_request(request_dict, self.score)
        score_elements = new_score.recurse(classFilter=('Note'))
        self.assertEqual(len(score_elements), 1)
