const cafeList = document.querySelector('#cafe-list');

const form = document.querySelector('#add-cafe-form');



//Create elements and render

function renderCafe(doc){
  let li = document.createElement('li');
  let name = document.createElement('span');
  let city = document.createElement('span');
  let cross = document.createElement('div')
  
  li.setAttribute('data-id',doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  cross.textContent = 'x'

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(cross);

  cafeList.appendChild(li);

  //Deleting Data
  cross.addEventListener('click',(e)=>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    db.collection('Cafes').doc(id).delete();
  })

}

//Getting Data From Firebase

//db.collection('Cafes').orderBy('name').get().then((snapshot)=>{
//    snapshot.docs.forEach(doc=>{
//        renderCafe(doc);
//    })
//})

//Saving Data In Firebase DataBase

form.addEventListener('submit',(e)=>{
  e.preventDefault();
  db.collection('Cafes').add({
    name: form.name.value,
    city: form.city.value
  })
  form.name.value = "";
  form.city.value= "";
})

//Real Time Listner

db.collection('Cafes').orderBy('city').onSnapshot(snapshot=>{
  let changes = snapshot.docChanges();
  changes.forEach(change=>{
    if(change.type=='added'){
      renderCafe(change.doc);

    }else if(change.type=='removed'){
      let li = cafeList.querySelector('[data-id=' + change.doc.id +']');
      cafeList.removeChild(li);
    }
  })
})
