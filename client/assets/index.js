const itemList = document.querySelector('.item-list');
const addItemForm = document.querySelector('.add-item-form');
const titleValue = document.getElementById('title-value');
const contentValue = document.getElementById('content-value');
const priceValue = document.getElementById('price-value');
const bntSubmit = document.querySelector('.btn');


let output = '';
const date = new Date();
let dateNow = date.toUTCString().slice(5,16);

const url = 'http://localhost:5000/item';

const renderItems = (items) => {
    items.forEach(item => {
        output +=`
        <div class="card mt-4 col-sm-3 bg-light">
            <div class="card-body" data-id=${item.id}>
                <h5 class="card-title">${item.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${dateNow}</h6>
                <p class="card-content">${item.content}</p>
                <p class="card-price">£${item.price}</p>                
                <a href="#" class="card-link" id="update-item">Update</a>
                <a href="#" class="card-link" id="delete-item">Delete</a>
            </div>
        </div>`;
    });
    itemList.innerHTML = output;
}







//GET - Read the Items
//Method: Get
fetch(url)
    .then(res => res.json())
    .then(data => {
        renderItems(data);
        console.log(data);
    })


itemList.addEventListener('click', (e) => {
    e.preventDefault();
    let delButtonIsPressed = e.target.id =='delete-item';
    let updateButtonIsPressed = e.target.id =='update-item';

    let id = e.target.parentElement.dataset.id;

    //Delete - removes the existing item from the list
    //method: DELETE
    if(delButtonIsPressed){
        fetch(`${url}/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    if(updateButtonIsPressed){
        const parent = e.target.parentElement;
        let titleContent = parent.querySelector('.card-title').textContent;
        let bodyContent = parent.querySelector('.card-content').textContent;
        let priceContent = parent.querySelector('.card-price').textContent;

        titleValue.value = titleContent;
        contentValue.value = bodyContent;
        priceValue.value = priceContent;
    }

    //Update - update the existing item
    //Method: PATCH
    bntSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
                title: titleValue.value,
                content: contentValue.value,
                price: priceValue.value
            })
        })
        .then(res => res.json())
        .then(() => location.reload())
    })
});    





//Create - add a new Item
//Method: Post
addItemForm.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch(url, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: titleValue.value,
            content: contentValue.value,
            price: priceValue.value
        })
    })
    .then(res => res.json())
    .then(data => {
        const dataArr = [];
        dataArr.push(data);
        renderItems(dataArr);
    })
    // reset input field to empty
    titleValue.value = '';
    contentValue.value = '';
    priceValue.value = '';

})



// window.addEventListener('load', function() {
//     document.querySelector('input[type="file"]').addEventListener('change', function() {
//         if (this.files && this.files[0]) {
//             var img = document.querySelector('img');
//             img.onload = () => {
//                 URL.revokeObjectURL(img.src);  
//             }
  
//             img.src = URL.createObjectURL(this.files[0]); 
//         }
//     });
//   });



