/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//problems:



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

// retrieved two classes located in the HTML to us here on the script
const studentList = document.querySelector('.student-list')
const linkList = document.querySelector('.link-list')

// ---------attempted to make the search button but got stuck
// const body = document.querySelector('body')
// const searchBar = document.createElement('input')


// searchBar.type = 'text'
// searchBar.classList.add('student-search')
// searchBar.placeholder = 'Search...'
// body.insertBefore(searchBar, body.firstChild)


const itemsPerPage = 9

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page){
   const start = (page * itemsPerPage) - itemsPerPage
   const end = page * itemsPerPage 

// made sure the studentList didnt show the previous students when page changed
   studentList.innerHTML = ''

   // i used Math.min() because each page after the first would display one more then what was put in itemsPerPage
   // now all but the pages will have the same amount of students(with the exception of the last page)
   for (let i = start; i < Math.min(end, list.length); i++){
      if (i >= start && i <= end){
         // this is the HTML element that has all the info of the students going onto the page
         const html = `
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
               <h3>${list[i].name.title}. ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
               <span class="date">Joined ${list[i].registered.date} Age: ${list[i].registered.age}</span>
            </div>
         </li>
         `

         studentList.insertAdjacentHTML("beforeend", html)
      }
   }
}





/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list){

   const numberOfButtons = Math.ceil(list.length / itemsPerPage)

   linkList.innerHTML = ''
   // arrays are 0 based so we start at 1 so the count doesnt begin at 0
   for (let i = 1; i <= numberOfButtons; i++){
      html = `
      <li>
         <button type="button">${[i]}</button>
      </li>
      `

      linkList.insertAdjacentHTML('beforeend', html)

      

      

   }
   // make sure the first button is highlighted when the page loads the first set of students 
   const firstButton = linkList.querySelector('button')
   if(firstButton){
      firstButton.className = 'active'
   }
   // add an event listener to link list that loops through every button and checks if it was clicked 
   linkList.addEventListener('click', (e)=> {
      const buttonClicked = e.target.closest('button')
      
      if(buttonClicked){
         const buttons = linkList.querySelectorAll('button')
         for (let i = 0; i < buttons.length; i++){
            buttons[i].classList.remove('active')
         }
         buttonClicked.classList.add('active')

         showPage(list, buttonClicked.textContent)
      }
   })
}



// Call functions
addPagination(data)
showPage(data, 1)