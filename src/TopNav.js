import './styles/topNavStyles.css'

const onMenuClick = () => {
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

export default function TopNav() {
    return (
        <>
            <div className="topnav" id="myTopnav">    
                <a href="#Admin">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                    <b> </b>Admin
                </a>
                <a href="#" className="active">
                    <i className="fa fa-cube" aria-hidden="true"></i>
                    <b> </b>Scene
                </a>
                
                <a className="icon" onClick={ onMenuClick }>
                <i id="menuBar" className="fa fa-bars"></i>
                </a>
            </div>
        </>
    )
  }
  