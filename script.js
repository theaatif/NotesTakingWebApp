const addBtn = document.getElementById('add')
const notesContainer = document.getElementById('notes-container')

const notes = JSON.parse(localStorage.getItem('notes'))

if(notes) {
    notes.forEach(note => addNewNote(note.text, note.color))
}

addBtn.addEventListener('click', () => addNewNote())

function addNewNote(text = '', color = 'color-1') {
    const note = document.createElement('div')
    note.classList.add('note', color)

    note.innerHTML = `
    <div class="tools">
        <div class="color-picker">
            <button class="color-1"></button>
            <button class="color-2"></button>
            <button class="color-3"></button>
            <button class="color-4"></button>
        </div>
        <button class="edit"><i class="fas fa-edit"></i></button>
        <button class="save"><i class="fas fa-save"></i></button>
        <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>

    <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>
    `

    const editBtn = note.querySelector('.edit')
    const saveBtn = note.querySelector('.save')
    const deleteBtn = note.querySelector('.delete')
    const main = note.querySelector('.main')
    const textArea = note.querySelector('textarea')
    const colorPicker = note.querySelector('.color-picker')

    textArea.value = text
    main.innerHTML = marked(text)

    deleteBtn.addEventListener('click', () => {
        note.remove()
        updateLS()
    })

    editBtn.addEventListener('click', () => {
        main.classList.add('hidden')
        textArea.classList.remove('hidden')
    })

    saveBtn.addEventListener('click', () => {
        main.innerHTML = marked(textArea.value)
        main.classList.remove('hidden')
        textArea.classList.add('hidden')
        updateLS()
    })

    textArea.addEventListener('input', (e) => {
        const { value } = e.target
        main.innerHTML = marked(value)
    })

    colorPicker.addEventListener('click', (e) => {
        if (e.target.tagName.toLowerCase() === 'button') {
            note.className = `note ${e.target.className}`
            updateLS()
        }
    })

    notesContainer.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('.note textarea')
    const notes = []

    notesText.forEach(note => {
        notes.push({
            text: note.value,
            color: note.closest('.note').classList[1]
        })
    })

    localStorage.setItem('notes', JSON.stringify(notes))
}