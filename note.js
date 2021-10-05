
// .....variables......

let form=document.getElementById('form-id');
let save=document.getElementById('save');
let title=document.getElementById('title');
let body=document.getElementById('texarea');
//let test=document.getElementById('delB');
let table=document.getElementById('table');
let search=document.getElementById('searchB');
let reset=document.getElementById('reset');

let lineCount=0;
let update=false;
let addNote;
let titleTag;
let textBody;

// .........events.........

// ..for page load...
window.onload=display;

form.addEventListener('submit',addtitle);

search.addEventListener('keyup',searctext)

table.addEventListener('click',deletNote);

table.addEventListener('click',updateNote);

reset.addEventListener('click',resetall);

// .......functions........

function display(){
    if(lineCount>0){
        table.style.display='';
    }
    else{
        table.style.display='none';
    }
}


function addtitle(x){
    x.preventDefault();
//    console.log(title.value)

   if(title.value=="" || body.value==""){
       alert('plese enter the values to note feelds')
   }
   else{

    let row=document.createElement('tr')
    row.className="iteam"
    // console.log(row);

    let td1=document.createElement('td')
    td1.className='td1';
    let nTitle=document.createTextNode(title.value);
    let nText=document.createElement('span')
    nText.appendChild(document.createTextNode(body.value));
    td1.appendChild(nTitle);
    td1.appendChild(nText);
    

    let td2=document.createElement('td');
    td2.className='view';
    let viewB=document.createElement('button');
    viewB.appendChild(document.createTextNode('View'));
    viewB.setAttribute('id','viewB');
    td2.appendChild(viewB);
    

    let td3=document.createElement('td')
    td3.className='delete';
    let delB=document.createElement('button');
    delB.appendChild(document.createTextNode('Delete'));
    delB.setAttribute('id','delB')
    td3.appendChild(delB);
    
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);

    addNote=row;

    if(update){
        titleTag.firstChild.textContent=title.value;
        textBody.lastChild.textContent=body.value;

        update=false;
    }
    else{
        table.appendChild(addNote);
        lineCount++;
    }
    

    display();

    resetall()

   }
}
// serch notes...
function searctext(x){
    // iteams to lowercase
    let sText=x.target.value.toLowerCase();
    // select table
    let iteams=document.getElementsByClassName('iteam');
    // table puts into array
    let iteamArr=Array.from(iteams);
    // select every iteam in list
    iteamArr.forEach(function(x){
        // take first child and get it as lowe case
        let notetitle=x.firstChild.textContent.toLowerCase();
        // match the two iteams
        if(notetitle.indexOf(sText)!=-1){
            // show resulz
            x.style.display='';
        }
        else{
            x.style.display='none'
        }
    })
}

function deletNote(x){
    let select=x.target.id;
    if(select==='delB'){
        if(confirm('are you sur about this')){
            let tr=x.target.parentElement.parentElement;
            table.removeChild(tr);
        }
    
        lineCount--;
        display();
    }
}

function updateNote(e){
    let select=e.target.id;
   // console.log(select)
    if(select==='viewB'){
       // console.log('view button')
        let tr=e.target.parentElement.parentElement;
        titleTag=tr.firstChild
        let tdTitle=titleTag.firstChild.textContent;
        title.value=tdTitle;

        textBody=tr.firstChild;
        let tdText=textBody.lastChild.textContent;
        body.value=tdText;

        update=true;

    }
}

function resetall(){
    body.value="";
    title.value="";
    update=false;
}