import React from 'react';

export default function SearchComponent(choosedContact){

    const matchUpBtn = document.querySelector("#matchUp");
    const matchDownBtn = document.querySelector("#matchDown");
    const matchesValue = document.querySelector("#matches");

    var indexToScroll = [];
    var index = 0;

    const searchDown = () =>{   
        if(indexToScroll.length > 0 && index < (indexToScroll.length-1)){
            const msgComponents = document.querySelectorAll(".msgTxt");
            index++;
            msgComponents[indexToScroll[index]].scrollIntoView({behavior: "smooth"});
            matchesValue.innerHTML = `Matches found: ${index+1} of ${indexToScroll.length}`;
        }
    }

    const searchUp = () =>{
        if(indexToScroll.length > 0 && index >= 1){
            const msgComponents = document.querySelectorAll(".msgTxt");
            index--;
            msgComponents[indexToScroll[index]].scrollIntoView({behavior: "smooth"});
            matchesValue.innerHTML = `Matches found: ${index+1} of ${indexToScroll.length}`
        }    
    }

    const searchWord = (e) => {
        const value = e.target.value;
        const msgComponents = document.querySelectorAll(".msgTxt");

        indexToScroll = [];

        if(value != ""){
            for(let i=0; i<msgComponents.length; i++){
                if(msgComponents[i].innerHTML.toLowerCase().includes(value.toLowerCase())){
                    indexToScroll.push(i);
                }
            }
        console.log(indexToScroll)

            if(indexToScroll.length > 0){
                index = 0;
                msgComponents[indexToScroll[index]].scrollIntoView({behavior: "smooth"});
                matchesValue.innerHTML = `Matches found: ${index+1} of ${indexToScroll.length}`;
                matchDownBtn.style.display = "block";
                matchUpBtn.style.display = "block";
            }
        }

        if(value == "" || indexToScroll.length == 0){
            matchesValue.innerHTML = ""
            matchDownBtn.style.display = "none";
            matchUpBtn.style.display = "none"
        }

        if(value != "" && indexToScroll.length == 0){
            matchesValue.innerHTML = "No Matches Found"
        }
    }
        
    return(
        choosedContact.length <= 0 ?
         null
        :
        
            <div style={{padding: 2, display: "flex", flexDirection: "row"}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <input 
                placeholder="Search"
                style={{minWidth: "40%", borderStyle:"none"}}
                onKeyUp={e => searchWord(e)}
                />

                <button id="matchUp" onClick={searchUp} style={{display:"none"}}>&#9650;</button>

                <button id="matchDown" onClick={searchDown}  style={{display:"none"}}>&#9660;</button>

                <div id="matches"></div>
                
            </div>        
        
    )
}