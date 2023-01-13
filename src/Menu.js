function onMenuClick() {
    var menu = document.getElementById("menuBar");
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
      menu.className = "fa fa-close";
      
    } else {
      x.className = "topnav";
      menu.className = "fa fa-bars";
    }
  }