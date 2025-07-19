export default function SearchBar({placehold, font, handlechange, onKey, initial = ""}) {
    return (
        <input className={font} type="text" name="search" id="1" placeholder={placehold} onChange={(e) => handlechange(e.target.value)} onKeyDown={onKey} value={initial}></input>
    )
}
