// alert("welcome");

class Note {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;

  }
}
class App {
  constructor() {
    this.notes = [new Note("abc1", "Text", "Text message")];
    this.$activeForm = document.querySelector(".active-form");
    this.$inactiveForm = document.querySelector(".inactive-form");
    this.$noteTitle = document.querySelector("#note-title")
    this.$noteText = document.querySelector("#note-text")
    this.$notes = document.querySelector(".notes")
    this.$form = document.querySelector("#form");

    this.addEventListeners();
    this.displayNotes();
  }

  addEventListeners() {
    document.body.addEventListener("click", (event) => {
      this.handleFormClick(event);
    })

    this.$form.addEventListener("submit", (event) =>  {
      event.preventDefault();
      const title = this.$noteTitle.value;
      const text = this.$noteText.value;
      this.addNote({ title, text});
      this.closeActiveForm();

    })

  }

  handleFormClick(event) {
    const isActiveFormClickedOn = this.$activeForm.contains(event.target);
    const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);
    const title = this.$noteTitle.value;
    const text = this.$noteText.value;

    if(isInactiveFormClickedOn) {
      this.openActiveForm();

    }
    else if(!isActiveFormClickedOn && !isActiveFormClickedOn) {
      this.addNote({ title, text});
      this.closeActiveForm();

    }
  }

  openActiveForm() {
    this.$inactiveForm.style.display = "none";
    this.$activeForm.style.display = "block";
    this.$noteText.focus();
  }

  closeActiveForm() {
    this.$inactiveForm.style.display = "block";
    this.$activeForm.style.display = "none";
    this.$noteText.focus();
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }


  addNote({title, text}) {
    if(text!= "") {
      const newNote = new Note(cuid() ,title, text);
      this.notes = [...this.notes, newNote];
      this.displayNotes();
    }

  }
  editNote(id, {title, text}) {  
    this.notes.map(note => {
      if(note.id == id) {
        note.title = title;
        note.text = text;
      }
      return note;
    })
  }
  deletNote(id) {
    this.notes = this.notes.filter(note => note.id != id)

  }
  handleMouseOverNote(element) {
    const $note = document.querySelector("#"+element.id);
    const $checkNote = $note.querySelector(".check-circle");
    const $noteFooter = $note.querySelector(".note-footer");
    $checkNote.style.visibility = "visible";
    $noteFooter.style.visibility = "visible";

  }
  handleMouseOutNote(element) {
    const $note = document.querySelector("#"+element.id);
    const $checkNote = $note.querySelector(".check-circle");
    const $noteFooter = $note.querySelector(".note-footer");
    $checkNote.style.visibility = "hidden";
    $noteFooter.style.visibility = "hidden";
  }


  displayNotes() {
    this.$notes.innerHTML = this.notes.map((note) => 
    `
      <div class="note" id="${note.id}" onmouseover="app.handleMouseOverNote(this)" onmouseout ="app.handleMouseOutNote(this)">
            <span class="material-icons check-circle">check_circle</span>
            <div class="title">${note.title}</div>
            <div class="text">${note.text}</div>
            <div class="note-footer">
                <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon">add_alert</span>
                    <span class="tooltip-text">Remind me</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon">person_add</span>
                    <span class="tooltip-text">Collaborator</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon">palette</span>
                    <span class="tooltip-text">Change Color</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon">image</span>
                    <span class="tooltip-text">Add Image</span>
                </div>
                <div class="tooltip archive">
                    <span class="material-icons-outlined hover small-icon">archive</span>
                    <span class="tooltip-text">Archive</span>
                </div>
                <div class="tooltip">
                    <span class="material-icons-outlined hover small-icon">more_vert</span>
                    <span class="tooltip-text">More</span>
                </div>
            </div>
        </div>
        `
        ).join("")
  }

}

const app = new App();





