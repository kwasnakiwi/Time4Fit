

function Tests(){
return(
    <>
        <div><label>text:</label> <input type="text" /></div>
        <div><label>password:</label> <input type="password" /></div>
        <div><label>email:</label> <input type="email" /></div>
        <div><label>number:</label> <input type="number" /></div>
        <div><label>tel:</label> <input type="tel" /></div>
        <div><label>url:</label> <input type="url" /></div>

        <div><label>date:</label> <input type="date" /></div>
        <div><label>datetime-local:</label> <input type="datetime-local" /></div>
        <div><label>month:</label> <input type="month" /></div>
        <div><label>week:</label> <input type="week" /></div>
        <div><label>time:</label> <input type="time" /></div>

        <div><label>checkbox:</label> <input type="checkbox" /></div>
        <div><label>radio:</label> <input type="radio" name="example" /></div>

        <div><label>file:</label> <input type="file" /></div>
        <div><label>image:</label> <input type="image" src="https://via.placeholder.com/50" alt="Submit" /></div>

        <div><label>color:</label> <input type="color" /></div>
        <div><label>range:</label> <input type="range" /></div>

        <div><label>button:</label> <input type="button" value="Kliknij mnie" /></div>
        <div><label>submit:</label> <input type="submit" value="Wyślij" /></div>
        <div><label>reset:</label> <input type="reset" value="Resetuj" /></div>

        <div><label>hidden:</label> <input type="hidden" value="ukryta wartość" />(niewidoczne)</div>
        <div><label>search:</label> <input type="search" /></div>
    </>
)
}

export default Tests