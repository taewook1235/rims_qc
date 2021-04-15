function save(item) {
    var surgeryListArray = getStoreArray("surgeryList");
    surgeryListArray.push(item);

    // localhost storage 저장
    localStorage.setItem("surgeryLsit", JSON.stringify(surgeryListArray));
}

//function loadPlaylist()
//{
//    var playListArray = getSaveSongs();
//    var ul = document.getElementById("playlist");
//    if( playListArray != null )
//    {
//        for(var i=0;i<playListArray.length;i++)
//        {
//            var li = document.createElement("li");
//            li.innerHTML = playListArray[i];
//            ul.appendChild(li);
//        }
//    }
//}

//function getSaveSongs()
//{
//    return getStoreArray("playlist");
//}

function getStoreArray(key) {
    //로컬스토리지 불러오기
    var surgeryListArray = localStorage.getItem(key);
    if (surgeryListArray == null || surgeryListArray == "") {
        surgeryListArray = new Array();
    } else {
        //JSON 이용 -- JSON html5의 기본객체임 
        surgeryListArray = JSON.parse(surgeryListArray);
    }
    return surgeryListArray;
}