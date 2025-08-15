    const createBtn = document.getElementById('create-note');
    const notesContainer = document.getElementById('notes-container');

    // Load notes from local storage on page load
    window.onload = function() {
      const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
      savedNotes.forEach(text => createNoteElement(text));
      updateNoteNumbers();
    };

    // Save all notes to local storage
    function saveNotes() {
      const notes = [];
      document.querySelectorAll('.note textarea').forEach(textarea => {
        notes.push(textarea.value);
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      updateNoteNumbers();
    }

    // Update numbering for notes
    function updateNoteNumbers() {
      document.querySelectorAll('.note-number').forEach((numEl, index) => {
        numEl.textContent = (index + 1) + '.';
      });
    }

    // Create a note element
    function createNoteElement(text = '') {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');

      const noteNumber = document.createElement('div');
      noteNumber.classList.add('note-number');

      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.rows = 3;
      textarea.addEventListener('input', saveNotes);

      const deleteIcon = document.createElement('span');
      deleteIcon.classList.add('delete-icon');
      deleteIcon.innerHTML = '&#128465;'; // Trash bin icon

      deleteIcon.addEventListener('click', () => {
        noteDiv.style.animation = 'deleteAnim 0.5s forwards';
        setTimeout(() => {
          noteDiv.remove();
          saveNotes();
        }, 500);
      });

      noteDiv.appendChild(noteNumber);
      noteDiv.appendChild(textarea);
      noteDiv.appendChild(deleteIcon);
      notesContainer.appendChild(noteDiv);
      updateNoteNumbers();
    }

    // Create note on button click
    createBtn.addEventListener('click', () => {
      createNoteElement('');
      saveNotes();
    });