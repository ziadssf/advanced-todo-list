const formEl = document.getElementById('form');
const inputEl = formEl.querySelector('input');
const addTodoEl = document.querySelector('.addTodo');
const todosEl = document.querySelector('.todos');
const alertEl = document.querySelector('.alert');
const visibile = document.querySelector('.visibile');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const d = new Date();

// functions
function thereIsNowName() {
   alertEl.querySelector('h1').textContent = 'Please enter a todo name';
   alertEl.querySelector('h1').style.color = 'red';
   alertEl.style.top = '50%';
   visibile.style.display = 'block';
   setTimeout(() => {
      alertEl.querySelector('h1').textContent = '';
      alertEl.querySelector('h1').style.color = 'black';
      alertEl.style.top = '-1000px';
      visibile.style.display = 'none';
      addTodoEl.addEventListener('keyup', () => false);
   }, 2000);
};

function today() {
   const dayName = days[d.getDay()];
   document.querySelector('#today').textContent = dayName;
   document.querySelector('#date').textContent = ` ${monthNames[d.getMonth()]} ${d.getDate()},${d.getFullYear()}`;
} today();


function displayTodoDom(todo) {
   const liEl = document.createElement('li');
   const sound = document.createElement('audio');
   sound.src = "./sounds/Delete Button - Sound Effect _HD_.mp3";
   sound.play();
   setTimeout(() => {
      sound.pause();
   }, 2500);
   if (todo.length >=35) {
      liEl.style.fontSize = '13px';
   }if (todo.length >= 45) {
      liEl.style.fontWeight = '500';
      liEl.style.fontSize = '12px';
   } if (todo.length >= 55) {
      liEl.style.fontSize = '17px';
      let slide = 0;
      setInterval(() => {
         slide += 50;
         console.log(slide);
         console.log(slide >= liEl.querySelector('.text'));
         liEl.querySelector('.text').style.marginLeft = '-' + slide + 'px';
         if (slide >= 800) {
            slide = 0;
         }
      }, 1800);
   }
   liEl.classList.add('bounceIn');
   liEl.innerHTML = `<div class="text">${todo}</div>
                     <div class="actions-btns">
                           <i id="check" class="fa fa-check" aria-hidden="true"></i>
                           <i id="edit" class="fa fa-edit" aria-hidden="true"></i>
                           <i id="remove" class="fa fa-trash" aria-hidden="true"></i>
                     </div>`;

   todosEl.appendChild(liEl);
};

function saveInLS(todo) {
   let todoArr;
   if (localStorage.getItem('todosLS') == null) {
      todoArr = [];
   } else {
      todoArr = JSON.parse(localStorage.getItem('todosLS'));
   }
   todoArr.push(todo);
   localStorage.setItem('todosLS', JSON.stringify(todoArr));
}

function displayTodoFromLs() {
   const todoArr = JSON.parse(localStorage.getItem('todosLS'));
   for (const todo of todoArr) {
      displayTodoDom(todo);
   }
}

function itemToDelete(item) {
   if (item.classList.contains("fa-trash") || item.id === "remove") {
      const todoLiEl = item.closest('li');
      todoLiEl.classList.remove("bounceIn");
      todoLiEl.classList.add("bounceOutDown");
      const sound = document.createElement('audio');
      sound.src = "./sounds/Delete Button - Sound Effect _HD_.mp3";
      sound.play();
      setTimeout(() => {
         sound.pause();
      }, 2500);
      setTimeout(() => {
         todoLiEl.remove();
      }, 1000);
      deleteFromLs(item);
   }
}

function deleteFromLs(item) {
   const todoArr = JSON.parse(localStorage.getItem('todosLS'));
   const todoLiEl = item.closest('li');

   const todoItemsLeft = todoArr.filter((todo) => todoLiEl.textContent.trim() !== todo);
   localStorage.setItem('todosLS', JSON.stringify(todoItemsLeft));
}

function itemToEdit(item) {
   if (item.classList.contains("fa-edit") || item.id === "edit") {
      const todoLiEl = item.closest('li');
      inputEl.value = todoLiEl.textContent.trim();
      todoLiEl.remove();
      inputEl.focus();
      editFromLs(item)
   }
}

function editFromLs(item) {
   deleteFromLs(item);
}

function itemToFinish(item) {
   if (item.classList.contains("fa-check") || item.id === "check") {
      const todoLiEl = item.closest('li');
      todoLiEl.firstElementChild.classList.toggle("completed");
      item.closest("li").firstElementChild.classList.toggle("flip")
      if (todoLiEl.querySelector('.text').classList.contains("completed")) {
         todoLiEl.style.background = "rgb(94, 205, 50)";
         const sound = document.createElement('audio');
         sound.src = "./sounds/Blinking Star Gamefx Sound Effects.mp3";
         sound.play();
         setTimeout(() => {
            sound.pause();
         }, 2500);
      } else {
         todoLiEl.style.background = "#808ab2";
      }
   }
}

//events

document.addEventListener('DOMContentLoaded', displayTodoFromLs);
formEl.addEventListener('submit', (e) => {
   e.preventDefault();
   const inputVal = addTodoEl.value;
   addTodoEl.value = '';
   if (!inputVal) {
      thereIsNowName();
   } else {
      displayTodoDom(inputVal);
      saveInLS(inputVal);
   }
   formEl.reset()
});

todosEl.addEventListener('click', (e) => {
   itemToDelete(e.target);
   itemToEdit(e.target);
   itemToFinish(e.target);
});

setTimeout(() => {
   document.querySelector('.todo header .text').classList.add('slideInLeft')
}, 700);