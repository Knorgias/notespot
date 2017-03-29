function showVideo(str) {
  var xhttp;    
  if (str == "") {
    document.getElementById("recom-vid").innerHTML = "";
    return;
  }
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      let target = document.getElementById("recom-vid")
      target.innerHTML = target.innerHTML + 'Yay';
    }
  };
  xhttp.open("GET", "/users/videos", true); 
  xhttp.send();
}