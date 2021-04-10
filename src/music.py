from music21.duration import Duration
from music21.note import Note, Rest
from music21.stream import Score
from music21.tie import Tie

from src.music_helper import musicxml_to_m21


'''
Returns a 4/4 C major score with 1 part and 4 measure.
Each measure has 1 whole rest.

:return: :class:`music23.stream.Score` object
'''
def create_blank_song() -> Score:
    new_song = musicxml_to_m21('')
    return new_song


'''
Returns a new note object

:param pitch: string, note's pitch (ex: C4, F5)
:param length: number of beats in the note (ex: 4, 1, 2.5)
:return: :class:`music23.note.Note` object
'''
def create_note(pitch: str, length: float) -> Note:
    new_note = Note(pitch)
    new_note.duration = Duration(length)
    return new_note


'''
Returns a new rest object

:param length: number of beats in the rest (ex: 4, 1, 2.5)
:return: :class:`music23.note.Rest` object
'''
def create_rest(length: float) -> Rest:
    new_rest = Rest()
    new_rest.duration = Duration(length)
    return new_rest


'''
Changes the title of a score

:param title: string, new title
:param score: :class:`music23.stream.Score` object
'''
def rename_song(title: str, score: Score):
    score.metadata.title = title
    score.metadata.movementName = title


'''
Changes the composer of a score

:param name: string, first name
:param score: :class:`music23.stream.Score` object
'''
def update_composer(name: str, score: Score):
    score.metadata.composer = name


'''
Creates a tie across a list of consecutive notes

:param new_notes: list of :class:`music23.note.Note` objects to tie together
'''
def create_tie(new_notes: list):
    if len(new_notes) > 2:
        # the first note 'start's the tie
        starting_note = new_notes[0]
        starting_note.tie = Tie('start')

        # middle notes 'continue' the tie
        for i in range(1, len(new_notes)-1):
            middle_note = new_notes[i]
            middle_note.tie = Tie('continue')

        # the last note 'stop's the tie
        ending_note = new_notes[-1]
        ending_note.tie = Tie('stop')

    # if there are only two notes, we don't need any 'continue' notes
    elif len(new_notes) == 2:
        starting_note = new_notes[0]
        starting_note.tie = Tie('start')

        ending_note = new_notes[-1]
        ending_note.tie = Tie('stop')


'''
After adding a new note, will fix any fragmented ties that were
altered by the addition

:param score: :class:`music23.stream.Score` object
:param new_notes: list of added consecutive :class:`music23.note.Note` objects
'''
def fix_old_ties(score: Score, new_notes: list):
    # get all of the notes and rests in this score
    all_elements = [e for e in score.recurse(classFilter=('Note', 'Rest'))]

    # we need to find the elements that come immeditaly before and after our addition
    before_index = None
    after_index = None

    for i in range(len(all_elements)):
        if before_index is None and all_elements[i] in new_notes:
            before_index = i - 1

        if before_index and all_elements[i] not in new_notes:
            after_index = i

    # if they exist, get the neighboring elements using the indexes we found
    before_element = None if before_index < 0 else all_elements[before_index]
    after_element = None if after_index is None else all_elements[after_index]

    # if the preceding element has a hanging tie, stop or remove it
    if before_element and before_element.tie:
        if before_element.tie.type == 'start':
            before_element.tie = None
        elif before_element.tie.type == 'continue':
            before_element.tie.type = 'stop'

    # if the succeeding element has a hanging tie, start or remove it
    if after_element and after_element.tie:
        if after_element.tie.type == 'stop':
            after_element.tie = None
        elif after_element.tie.type == 'continue':
            after_element.tie.type = 'start'


'''
Merges successive rests in each measure of a score

:param score: :class:`music23.stream.Score` object
'''
def merge_rests(score: Score):
    # TO DO
    pass


'''
Inserts a new note or rest into an existing score.
Removes elements or portions of elements that overlap with the new note.
For notes that span multiple measures, this function adds a new note to
each affected measure and uses a tie to conenct them.

:param score: :class:`music23.stream.Score` object
:param pitch: string, note's pitch (ex: C4, F5)
:param duration: float, total note duration
:param position: float, starting index of note (ex: beat 1 of measure 2 is position 4)
'''
def insert_note(score: Score, pitch: str, duration: float, position: float):
    measure_index = (int)(position // 4 + 1)
    added_elements = []  # list of inserted notes

    # while we have more notes to make
    while duration > 0:
        start_beat = position % 4
        end_beat = start_beat + duration
        # do not allow any note to surpass the starting measure
        end_beat = end_beat if end_beat <= 4 else 4

        # get the current measure
        measure = score.parts[0].measure(measure_index)
        # split any note where it overlaps the future position of our new element.
        # this will allow us to retain the part(s) of the note/rest that do not overlap with the new note
        measure.sliceAtOffsets([start_beat, end_beat], inPlace=True)

        # remove existing elements that overlap the new element
        elements_to_remove = measure.getElementsByOffset(
            start_beat,
            end_beat,
            includeEndBoundary=False,
            includeElementsThatEndAtStart=False
        )
        for e in elements_to_remove:
            measure.remove(e)

        if pitch == 'R':
            new_element = create_rest(end_beat - start_beat)
        else:
            new_element = create_note(pitch, end_beat - start_beat)

        # insert the new note into the measure
        measure.insert(start_beat, new_element)
        added_elements.append(new_element)

        duration -= (end_beat - start_beat)
        position = 0
        measure_index += 1

    fix_old_ties(score, added_elements)

    # if we added multiple notes, we need to tie them together
    if len(added_elements) > 1 and isinstance(added_elements[0], Note):
        create_tie(added_elements)

    merge_rests(score)


'''
Recieves a json request string for updating a song and performs the appropriate update.
This function is idempotent

:param request: string, json update request
:return: string, json response
'''
def handle_update_request(request_dict: dict, my_song: Score) -> Score:
    if 'title' in request_dict:
        new_title = request_dict.get('title')
        rename_song(new_title, my_song)
        print(my_song.metadata.title)

    if 'note' in request_dict:
        pitch = request_dict.get('note').get('pitch')
        duration = (float)(request_dict.get('note').get('duration'))
        position = (float)(request_dict.get('note').get('position'))

        insert_note(my_song, pitch, duration, position)

    return my_song
