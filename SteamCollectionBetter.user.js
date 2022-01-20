// ==UserScript==
// @name         SteamCollectionBetter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @updateURL    https://github.com/SmileyZomb/SteamCollection-Better/raw/main/SteamCollectionBetter.user.js
// @downloadURL  https://github.com/SmileyZomb/SteamCollection-Better/raw/main/SteamCollectionBetter.user.js
// @description  try to take over the world!
// @author       SmileyZomb
// @match        https://steamcommunity.com/sharedfiles/managecollection/?id=*
// @icon         https://www.google.com/s2/favicons?domain=steamcommunity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const custom_style = {
        margin: "0 0 10px 20px",
        "font-size": "16px"
    };
    let CollectionTabs = document.querySelector("#CollectionTabs");
    let searchInput = document.createElement("INPUT");
    searchInput.id = "mySearch";
    searchInput.placeholder = "Chercher un addon";
    Object.assign(searchInput.style,custom_style);
    let curTab = [...document.querySelector("#Items").children].find(d => d.id === CollectionTabs.querySelector('.active').id.replace('Tab', ''))
    searchInput.onkeyup = myFunction
    CollectionTabs.appendChild(searchInput);
    let insInput = document.createElement("INPUT");
    insInput.id = "insSearch";
    insInput.placeholder = "Chercher un addon installé";
    Object.assign(insInput.style,custom_style);
    insInput.onkeyup = insSearchFunction
    document.querySelector(".manageItemsSort").appendChild(insInput);
    document.getElementById("MyItems").style.height = "400px";
    document.getElementById("MyFavoriteItems").style.height = "800px";
    document.getElementById("MySubscribedItems").style.height = "800px";
    let scrollpos_fi = sessionStorage.getItem('scrollpos_MyFavoriteItems');
    let scrollpos_si = sessionStorage.getItem('MySubscribedItems');
    if (scrollpos_fi) {
        document.getElementById("MyFavoriteItems").scrollTop = scrollpos_fi;
        sessionStorage.removeItem('scrollpos_fi');
    };
    if (scrollpos_si) {
        document.getElementById("MySubscribedItems").scrollTop = scrollpos_si;
        sessionStorage.removeItem('scrollpos_si');
    };

    CollectionTabs.addEventListener("click", function(e) {
        if(e.target === this) return;
        if(e.target.id === "mySearch") return;
        searchInput.value = '';
        cleanTabs()
        //cleanList()
        curTab = [...document.querySelector("#Items").children].find(d => d.id === e.target.id.replace('Tab', ''))
        //searchInput.onkeyup = myFunction
    });

    window.addEventListener("beforeunload", function (e) {
        sessionStorage.setItem('scrollpos_MyFavoriteItems', document.getElementById("MyFavoriteItems").scrollTop);
        sessionStorage.setItem('scrollpos_MySubscribedItems', document.getElementById("MySubscribedItems").scrollTop);
    });

    function myFunction() {
        // Declare variables
        let input, filter, ul, li, a, i;
        input = document.getElementById("mySearch");
        filter = input.value.toUpperCase();
        //ul = document.getElementById(list);
        li = curTab.getElementsByClassName("itemChoice");

        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("itemChoiceTitle")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    function insSearchFunction() {
        // Declare variables
        let input, filter, ul, li, a, i;
        input = document.getElementById("insSearch");
        filter = input.value.toUpperCase();
        ul = document.getElementById("sortable_items");
        li = ul.getElementsByClassName("managedCollectionItem");
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByClassName("actual_title")[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    function cleanTab() {
        let els = [...curTab.children]
        els.forEach(el => {
            el.style.display = ""
        })
    }
    function cleanTabs() {
        let i
        let tabs = [...document.querySelector("#Items").children]
        tabs.forEach(tab => {
            let childs = [...tab.children]
            childs.forEach(ch => ch.style.display = "")
        })
    }
})();
