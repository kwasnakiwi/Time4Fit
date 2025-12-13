

function CalEvent({ title, start, end, color, borderColor }){


  return(
    <>
      <div 
        className="cal-event-object"
        style={{backgroundColor: color, borderColor: borderColor}}
      >
        <strong>{title}</strong>
      </div>
    </>
  )
}

export default CalEvent