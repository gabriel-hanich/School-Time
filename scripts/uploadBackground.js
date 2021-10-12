var uploader = document.getElementById("fileUpload");
var eraseBtn = document.getElementById("eraseBtn")
var body = document.body;

var reader = new FileReader();;
reader.addEventListener('load', function(event){
    localStorage.removeItem("imgUrl")
    try {
        localStorage.setItem("imgUrl", reader.result);
    }
    catch (e) {
        alert("Welp, That Image is too big, Try using a smaller one")
    }
    localStorage.setItem("imgUrl", JSON.stringify(reader.result)); // Save image URL in localStorage
    window.location.href = "../pages/display.html";
});


function saveImg(event){
    const img = uploader.files[0];
    reader.readAsDataURL(img);
}

uploader.addEventListener("change", saveImg);

eraseBtn.addEventListener("click", function(event){
    localStorage.removeItem("imgUrl");
    window.location.href = "../pages/display.html"
});
