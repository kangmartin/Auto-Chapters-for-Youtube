let chapters = {
    "2023-11-13": "Example 1",
    "2023-11-14": "Example 2",
    "2023-11-15": "Example 3",
  
};

ul= document.querySelector('ul')

function build(list){
    Object.entries(list).forEach(entry => {
                let [date, example] = entry;
                buildChapter(date, example, ul);
    
})
}

function buildChapter(date,exmeple,parent){
    li=document.createElement('li')
    time=document.createElement("p")
    time.id="time"
    time.textContent=date// la date 

    p=document.createElement("p")
    p.textContent=exmeple // l'exemple
    
    li.appendChild(time)
    li.appendChild(p)
    parent.appendChild(li)

}


build(chapters)





// function build(list) {
//     let ul = document.getElementById('chapterList');

//     

//     // Appeler buildChapter pour chaque entrée dans le dictionnaire
//     Object.entries(list).forEach(entry => {
//         let [date, example] = entry;
//         buildChapter(date, example, ul);
//     });
// }

// function buildChapter(date, example, parent) {
//     let li = document.createElement('li');
//     let time = document.createElement('p');
//     time.id = 'time';
//     time.textContent = date;

//     let p = document.createElement('p');
//     p.textContent = example;

//     li.appendChild(time);
//     li.appendChild(p);
//     parent.appendChild(li);
// }

// // Appeler la fonction build avec le dictionnaire chapters
// build(chapters);