import BiteSquad from "./asesst/BiteSquad.svg"
function Header(props) {
    return (
        <header>
            <img src={BiteSquad} alt="" />
            <div id="search">
                <input type="text" name="" id="" placeholder="Pretrazi hranu" />
            </div>
        </header>
        
    )
}
export default Header;