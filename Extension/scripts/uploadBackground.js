var uploader = document.getElementById("fileUpload");
var eraseBtn = document.getElementById("eraseBtn")
var body = document.body;

var reader = new FileReader();;
reader.addEventListener('load', function(event){
    body.style = `
    background: url(` + reader.result + `) no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    `
    localStorage.setItem("imgUrl", JSON.stringify(reader.result));
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
