
let button = document.querySelector('.btn')
let form = document.querySelector('#form')
let bookEL = document.querySelector('#book')
let bookWrapper = document.querySelector('.book-wrapper')
let books = []
let title = ''
let image = ''
let author = ''
let publisher = ''
let link = ''
let submitted = false



form.addEventListener('submit', function(e){

    e.preventDefault()

    location.reload()
    console.log(e.type)
    let search =(e.target.elements.search.value)

    if(search === '' ){
        let p = document.createElement('p')
            p.textContent = 'Enter search terms'
            bookWrapper.appendChild(p)
            setTimeout(function () {
                location.reload()
            }, 500);
        
    }
    else{
        if(submitted){
            return
        }
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}`)
       .then((res) => {
        return res.json()
    })
    .then((data) => {

        console.log(data)
        if(data == undefined || data.totalItems === 0){

            let p = document.createElement('p')
            p.textContent = 'Search not found'
            bookWrapper.appendChild(p)

            setTimeout(function () {
                location.reload()
            }, 500);
            

        }
        else{
        submitted = true
        data.items.forEach((book) =>{

        title = book.volumeInfo.title
        author = book.volumeInfo.authors
        image = book.volumeInfo.imageLinks.thumbnail
        link = link + book.volumeInfo.infoLink
        publisher = book.volumeInfo.publisher
        console.log(title,author,image,publisher,link)
        
        let titleDisplay = document.createElement('div')
        
        
        let output = ''

        output += 
        `
        <div class ="book_wrapper"> 
        <img class="book_thmb" src= ${image} alt= ${title}>
        <div class="book_content">
            <h2 class="book_title"><span id="title-result">${title}</span></h2>
            <h3>
                <div>By:  </div>
                <div><span id="author-result">${author}</span></div>
            </h3>
            <h3>
            <div>Published by: </div>
            <div>${publisher}</div>
            </h3>
            <a href= ${link} target="_blank" rel="noopener noreferrer">
            <button class="book_info_button">See this Book</button></a>
        </div>
        </div>`
        
        titleDisplay.innerHTML = output
        bookWrapper.appendChild(titleDisplay)


        })
     
    }


    }).catch((error) => {

        console.log(error)
    })
    }
})