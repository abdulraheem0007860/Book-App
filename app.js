class Book{
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

class UI{
    static addBookToList(book){   
         const list = document.querySelector("#book-list")
         const row = document.createElement("tr") //<tr></tr>
         row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                <td><a href="#">  <button type="button" class="btn btn-danger btn-sm delete">x</button></a></td>`
                    list.appendChild(row);

    }
    static  clearAllFields(){
           document.querySelector("#title").value =" ";
           document.querySelector("#author").value =" ";
           document.querySelector("#isbn").value =" ";
    

    }
    static showAlert(msg,className){
        const div = document.createElement("div")
        div.className =`alert alert-${className}`
        div.appendChild(document.createTextNode(msg))
        const container =document.querySelector(".container")
        const form =document.querySelector("#book-form")
        container.insertBefore(div,form)
        setTimeout(function(){
            document.querySelector(".alert").remove()
        },5000)
    }
  
    static displaybook(){
     
        const books = Store.getBooks();
        books.forEach(book => UI.addBookToList(book))

    }
    static deleteBook(x){
        if(x.target.classList.contains('delete')){
            if(confirm("Are you want to delete this")){
                x.target.parentElement.parentElement.parentElement.remove()
                // x.parentElement.parentElement.remove()
            }
             }
    }                       
}
class Store{
    static addBook(book){
        const books = Store.getBooks();
        books.push(book)
        localStorage.setItem("books",JSON.stringify(books))
    }
    static getBooks(){
        let books;
        if(localStorage.getItem("books") == null)
        books =[];
        else
        books = JSON.parse(localStorage.getItem("books"))

        return books;

    }
      static removeBook(isbn){

         // console.log(isbn)
         const books =store.getBooks();
        //   const books = Store.getBooks();
        //   console.log(books)
       books.forEach((book,index) => {
           console.log(book.isbn)
       }
       )}
}

 //event A BOOK
document.addEventListener('DOMContentLoaded',()=>UI.displaybook())


//Events

document.querySelector("#book-form").addEventListener('submit',(e) =>{
    e.preventDefault()
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn =document.querySelector("#isbn").value;
    //console.log(title,author,isbn)
    if(title ==''|| author ==''|| isbn ==''){
    UI.showAlert("please Add All The field","danger")
    return;
}
    const book = new Book(title,author,isbn);
    //console.log(book)
    //add book to UI
    UI.addBookToList(book);

    //localstorage
    Store.addBook(book);
    

    //Clear Fields
    UI.clearAllFields();
    // show success msg
    UI.showAlert("Book Added Successfully","success")


})

document.querySelector("#book-list").addEventListener('click',(x)=>{
    // console.log(x)
    //delete book from UI
    UI.deleteBook(x)
    
    Store.removeBook(x.parentElement)

    UI.showAlert("Book Deleted Successfully","success")
})