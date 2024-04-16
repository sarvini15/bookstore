const express = require('express');
const app = express();

let books = [
  { id: 'b1', title: 'Book One', description: 'Description of book one', authorId: 'a1' },
  { id: 'b2', title: 'Book Two', description: 'Description of book two', authorId: 'a2' },
];

let reviews = [
  { id: 'r1', text: 'Amazing book!', bookId: 'b1' },
  { id: 'r2', text: 'Decent read.', bookId: 'b2' },
];

let authors = [
  { id: 'a1', name: 'Author One', bio: 'Bio of Author One' },
  { id: 'a2', name: 'Author Two', bio: 'Bio of Author Two' },
];

// Your routing and controller code goes here
app.get("/books", (request,response) => {
  response.status(200).json(books);
})

app.get("/books/:id", (request,response) => {
  const book = books.find( b => b.id === request.params.id );
  if ( book ) {
    const author = authors.find( a => a.id === book.authorId );
    // response.status(200).json({
    //   id: book.id,
    //   title: book.title,
    //   description: book.description,
    //   name: author.name,
    //   bio: author.bio
    // });
    response.status(200).json({
      ...book,
      name: author.name,
      bio: author.bio
    });
  } else {
    response.status(404).json("Book not found");
  }

})

app.get("/reviews", (request,response) => {
  response.status(200).json(reviews);
})

app.get("/reviews/:id", (request,response) => {
  const review = reviews.find( b => b.id === request.params.id );
  if ( review ) {
    const book = books.find( a => a.id === review.bookId );
    response.status(200).json({
      ...review,
      book_title: book.title
    });
  } else {
    response.status(404).json("Review not found");
  }
})

app.get("/authors", (request,response) => {
  response.status(200).json(authors);
})

app.get("/authors/:id", (request,response) => {
  const author = authors.find( b => b.id === request.params.id );
  if ( author ) {
    response.status(200).json(author);
  } else {
    response.status(404).json("Author not found");
  }
})

app.listen(5000, () => {
  console.log('Bookstore app is running on port 5000');
});