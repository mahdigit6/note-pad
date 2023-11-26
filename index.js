//variables
const noteList = document.querySelector('#note-list')

//eventlistenrs
eventlisteners()
//form submissiom
function eventlisteners(){
    document.querySelector('#form').addEventListener('submit' , newNote)

    //remove note 
    document.querySelector('#note-list').addEventListener('click', removeNote)

    //get data from localstorage on loaded
    document.addEventListener('DOMContentLoaded' , localStorageOnload)
}

//functions
//addingn new note to the list
function newNote(e){
    e.preventDefault()
    // access to the value
    const note = document.querySelector('#note').value

    //creat remove element
    const removeBtn =document.createElement('a')
    removeBtn.textContent = 'X'
    removeBtn.classList = 'remove-note'

    //creat <li> tag
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(note))

    //adding remove Btn to the li
    li.appendChild(removeBtn)

    //adding li to the note list
    noteList.appendChild(li)

    this.reset()

    addNoteToLocalStorage(note)

    alert('Your note has been saved')

} 

//remove note frome list
function removeNote(e){
    if(e.target.classList.contains('remove-note')){
        e.target.parentElement.remove()
    }  
    
    //also remote the note from the localstorage
    removeNoteLocalStorage(e.target.parentElement.textContent)

    alert('Are you sure you want to delete?')
}

//adding note to the locl storage
function addNoteToLocalStorage(note){
    //get the notes from localstorage
    const notes = getNotesFromLocalStorage()

    //add new note to the notes array
    notes.push(note)

    //add new notes array to the localstorage
    localStorage.setItem('notes' , JSON.stringify(notes))
}

//get notes from localstorage
function getNotesFromLocalStorage(){
let notes;

//get previous notes from localstorage
let getFromLs = localStorage.getItem('notes');

//if note exist creat empty array
if (getFromLs === null) {
    notes = []
    
} else {
    //if exist convert to the array
    notes = JSON.parse(getFromLs) 
    
}
return notes

}

//get data from local storage on load
function localStorageOnload(){
    const notes = getNotesFromLocalStorage();

        //print each item of array
        notes.forEach(function(note) {

                //creat remove element
        const removeBtn =document.createElement('a')
        removeBtn.textContent = 'X'
        removeBtn.classList = 'remove-note'
        //creat <li> tag
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(note))

        //adding remove Btn to the li
        li.appendChild(removeBtn)

        //adding li to the note list
        noteList.appendChild(li)

        
    });
}

//also Remove note from localstorage
function removeNoteLocalStorage(noteContent){
    //delete x from the content
    const noteDelete = noteContent.substring(0, noteContent.length - 1)
    
    //get notes frome localstorage
    const notesFromLS = getNotesFromLocalStorage()

    notesFromLS.forEach(function (note , index) {
        if(note === noteDelete){
            notesFromLS.splice(index , 1)
        }

    });
    //set new array of notes to the localstorage
    localStorage.setItem('notes' , JSON.stringify(notesFromLS))
    
}

