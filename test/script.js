let chapters = {
    "0:00 ":"Example 1",
    "0:35": "Example 2",
    "1:56": "Example 3",
    "2:00 ":"Example 1",
    "3:35": "Example 2",
    "4:56": "Example 3",
    "5:00 ":"Example 1",
    "8:35": "Example 2",
    "10:56": "Example 3",
    "12:00 ":"Example 1",
    
  
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
    time.textContent=date

    p=document.createElement("p")
    p.textContent=exmeple 
    
    li.appendChild(time)
    li.addEventListener('click', function() {
        add="&t="+translatetime(date)+"s"
        // path=       +add
        console.log(add)
    });
    li.appendChild(p)
    
    parent.appendChild(li)

}

function translatetime(time) {
    // translate from "12:25" to an int

    // for hour case
    if (time.length > 5) {
        let index = time.indexOf(":");
        let heure = time.substring(0, index);

        time = time.substring(index + 1);
        index = time.indexOf(":");
        let minute = time.substring(0, index);

        let seconde = time.substring(index + 1);
        return heure * 3600 + minute * 60 + seconde * 1;
    } else {
        let index = time.indexOf(":");
        let minute = time.substring(0, index);
        let seconde = time.substring(index + 1);
        return minute * 60 + seconde * 1;
    }
}

console.log(translatetime("1:01:03"));

build(chapters)