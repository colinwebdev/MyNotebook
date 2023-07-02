const input = document.querySelector('.input')
const inputBox = input.querySelector('#inputBox')
const instructBox = document.querySelector('.instructions')

// Listener to open the instructions box
instructBox.addEventListener('click', () => {
    instructBox.classList.add('hide')
})

// Show the input form
function showInput() {
    input.classList.remove('hide')
    input.querySelector('.saveButton').addEventListener('click', (event)=>{
        event.preventDefault()
        readInput()
    })
}

// Functions to show and hide instructions
function instructions() {
    instructBox.classList.remove('hide')
}

function closeInput() {
    input.classList.add('hide')
}

// Verify the content and save it to local storage if it's valid
function readInput() {
    const input = inputBox.value
    if (input.includes("<")) {
        alert("No HTML allowed")
        return
    } else if (input != ""){
        let entries = JSON.parse(localStorage.getItem('entries'))
        console.log(entries)
        let entryID = 0
        if (!entries) {
            entries = []
        } else if (entries.length > 0) {
            entryID = entries[0].id + 1
        } 
        let entry = {
            "id": entryID,
            "body": input
        }
        // Add entry to the beginning of the array so newest items are at the top
        entries.unshift(entry)
        localStorage.setItem('entries', JSON.stringify(entries))
        window.location.reload()
    }
}

// Function to display the content
function makeText(id, text, index) {
    let div = document.createElement('div')
    div.classList = 'content'
    let contents = text.split('\n')
    let textContain = document.createElement('div')
    textContain.classList = 'textContain'
    let linkDiv = document.createElement('div')
    linkDiv.classList = 'outputLink'

    // Iterate over all entries and assign to their various places
    contents.forEach(item => {
        if (item.toLowerCase().startsWith("http")) {
            let linkType = item.toLowerCase().split(".").pop()
            let imgs = ["jpeg", "jpg", "gif", "gifv", "tif", "svg", "png", "pnj", "webp", "bmp"]
            if(imgs.includes(linkType)){
                let imgLink = document.createElement('a')
                let img = document.createElement('img')
                img.src = item
                img.alt = id
                img.classList = 'outputImg'
                imgLink.href = ""
                imgLink.title = id
                imgLink.appendChild(img)
                // Event listener to show a larger image
                imgLink.addEventListener('click', (event) => {
                    showImg(event, item, id)
                })
                linkDiv.prepend(imgLink)
            }  else {
                let a = document.createElement('a')
                a.href = item
                a.title = id
                a.classList = 'displayLink'
                a.innerHTML = '<i class="fa-solid fa-link link">'
                linkDiv.appendChild(a)
            }
        } else {
            let p = document.createElement('p')
            p.innerHTML = item
            textContain.appendChild(p)
        }
    })
    if (linkDiv.innerHTML != '') {
        div.prepend(linkDiv)
    }
    div.appendChild(textContain)
    // Pass info off to make the post controls
    makeDiv(id, div, index)
}

// Create post controls and listeners for each post
function makeDiv(id, src, index) {
    const outputBox = document.querySelector('#output')
    const wrapDiv = document.createElement('div')
    const buttonsBox = document.createElement('div')
    wrapDiv.classList = "box"
    buttonsBox.classList = 'boxFooter'
    wrapDiv.appendChild(src)
    wrapDiv.append(buttonsBox)
    outputBox.append(wrapDiv)

    // Create the icon to delete entries
    const delIcon = document.createElement('i')
    delIcon.classList = 'fa-solid fa-minus icon delete'
    delIcon.addEventListener('click', () => removeItem(index, id))
    buttonsBox.append(delIcon)

    // Create the icon to edit entires
    const editIcon = document.createElement('i')
    editIcon.classList = 'fa-solid fa-pencil icon edit'
    editIcon.addEventListener('click', () => editItem(index, id))
    buttonsBox.appendChild(editIcon)
}

// Function to edit entries in the input box
function editItem(index, id) {
    const entries = JSON.parse(localStorage.getItem('entries'))
    let editPop = document.getElementById(id)
    inputBox.value = entries[index].body
    input.classList.remove('hide')

    input.querySelector('.saveButton').addEventListener('click', (event)=>{
        event.preventDefault()
        entries[index].body = inputBox.value
        localStorage.setItem('entries', JSON.stringify(entries))
        window.location.reload()
    })
    input.querySelector('.clearButton').addEventListener('click', (event)=>{
        event.preventDefault()
        inputBox.value=''
    })
    
}

// Function to remove the entries from the stored data
function removeItem(index, id) {
    // Warn before deletion
    const confirmDelete = confirm("Deleting an item can not be undone. \n Are you sure you want to proceed?")
    if (confirmDelete) {
        let entries = JSON.parse(localStorage.getItem('entries'))
        if (entries[index].id == id) {
            entries.splice(index, 1)
            localStorage.setItem('entries', JSON.stringify(entries))
        }
        location.reload()
    }
}

// Function to remove all entries
function clearAll() {
    // Warn before deletion
    const confirmDelete = confirm("All items will be removed, this cannot be undone. \n Would you like to proceed?")
        if (confirm) {
            localStorage.removeItem('entries')
        }
        location.reload()
}

// Shows a larger version of the image, closes when clicked anywhere
function showImg(e, link, id) {
    e.preventDefault()
    let shield = document.createElement('div')
    shield.classList = 'shield'
    let img = document.createElement("img")
    img.src = link
    img.classList = "bigImg"
    img.alt = id
    shield.appendChild(img)
    document.querySelector('body').appendChild(shield)
    shield.addEventListener('click', () => {
        shield.remove()
    })
}

// Get stored entries and display them if there are any
window.addEventListener('load', ()=>{
    let entries = JSON.parse(localStorage.getItem('entries'))
    // Need to check if entries even exist or javascript gets mad
    if (entries) {
        for (let i = 0; i < entries.length; i++) {
            id = entries[i].id
            body = entries[i].body
            type = entries[i].type
            makeText(id, body, i)
        }
    }

})

