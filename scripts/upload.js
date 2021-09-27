var body = document.body,
    upload = document.getElementById("file-uploader"),
    submitButton = document.getElementById("form-submit");


submitButton.addEventListener("click", function(event){
    event.preventDefault();
    file = upload.files[0];

    var fr=new FileReader();
    fr.onload = function(){
        processData(fr.result)
    };
    
    fr.readAsText(file);
 
});



function processData(data){
    var dataList = [];
    var lastbreak = 0;
    for(var i=0; i < data.length; i++){
        if(i != data.length){
            if(data.substring(i, i+1) == "\n"){
                dataList.push(data.substring(lastbreak, i -1));
                lastbreak = i + 1;
            }
        }
    }
    for(var i = 0; i<dataList.length; i++){
        if(dataList[i].includes("DTSTART")){
            var year = dataList[i].substring(24, 28);

            var month = parseInt(dataList[i].substring(28, 30));
            month -= 1;
            month = month.toString();
            var day = dataList[i].substring(30, 32);

            var hour = dataList[i].substring(33, 35);
            var minute = dataList[i].substring(35, 37);

            var startDate = new Date(Date.UTC(year, month, day, hour, minute ,0));
            console.log(startDate)
            
        }
    else if(dataList[i].includes("DTEND")){
        var year = dataList[i].substring(22, 26);

        var month = parseInt(dataList[i].substring(26, 28));
        month -= 1;
        month = month.toString();
        var day = dataList[i].substring(28, 30);

        var hour = dataList[i].substring(31, 33);
        var minute = dataList[i].substring(33, 35);

        var endDate = new Date(Date.UTC(year, month, day, hour, minute ,0));
        console.log(endDate);
        }
    }
}