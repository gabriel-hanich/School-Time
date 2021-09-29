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

class periodClass{
    constructor(startDate, endDate, desc, summary, location){
        this.startDate = startDate;
        this.endDate = endDate;
        this.desc = desc;
        this.summary = summary;
        this.location = location

    }
}

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

    var periodClassList = [];
    for(var i = 0; i<dataList.length; i++){
        if (dataList[i] == "BEGIN:VEVENT"){ // BEGUIN:VEVENT occurs at the start of new period on the iCal file
            // Calculate starting date and time of period
            var startYear = dataList[i + 1].substring(24, 28);

            var startMonth = parseInt(dataList[i + 1].substring(28, 30));
            startMonth -= 1;
            startMonth = startMonth.toString();
            var startDay = dataList[i + 1].substring(30, 32);

            var startHour = dataList[i + 1].substring(33, 35);
            var startMinute = dataList[i+ 1].substring(35, 37);
            
            var startDate = new Date(Date.UTC(startYear, startMonth, startDay, startHour, startMinute ,0));
            // Calculate end date and time of period
            var endYear = dataList[i + 3].substring(22, 26);

            var endMonth = parseInt(dataList[i + 3].substring(26, 28));
            endMonth -= 1;
            endMonth = endMonth.toString();
            var endDay = dataList[i + 3].substring(28, 30);

            var endHour = dataList[i + 3].substring(31, 33);
            var endMinute = dataList[i + 3].substring(33, 35);


            var endDate = new Date(Date.UTC(endYear, endMonth, endDay, endHour, endMinute ,0));
            

            // Get other pieces of data
            var desc = dataList[i + 5].substring(12);  
            var summary = dataList[i + 6].substring(8);
            var location = dataList[i + 7].substring(9)

            if(dataList[i+ 8] == "END:VEVENT"){ // Double checks file strucrture before appending list
                periodClassList.push(new periodClass(startDate, endDate, desc, summary, location));
            }

        }
    }

    console.log(periodClassList)
}