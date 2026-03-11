function CalEvent({ title, start, end, getEventPosition, events, index }) {
  const colors = ["#D8F6DC", "#DEF1F7", "#DEDFF7", "#F7F7DE"];
  const borderColors = ["#4EDF62", "#53CFF6", "#5361F6", "#E3F653"];

  const startPos = getEventPosition(start);
  const endPos = getEventPosition(end);
  const height = endPos - startPos;

  // LOGIKA SZUKANIA KOLUMNY:
  const findColumn = () => {
    const occupiedColumns = new Set();

    // Sprawdzamy tylko eventy, które są wcześniej na liście (już mają swoje kolumny)
    for (let i = 0; i < index; i++) {
      const other = events[i];
      const otherStart = getEventPosition(other.start);
      const otherEnd = getEventPosition(other.end);

      // Czy te eventy nachodzą na siebie czasowo?
      const overlap = startPos <= otherEnd && endPos >= otherStart;

      if (overlap) {
        // Jeśli tak, to wiemy, że kolumna zajęta przez 'other' jest dla nas niedostępna
        // (Musimy wcześniej przypisać kolumnę do obiektu eventu)
        occupiedColumns.add(other.assignedCol);
      }
    }

    // Szukamy pierwszego wolnego numeru od 0 do 6
    for (let col = 0; col < 7; col++) {
      if (!occupiedColumns.has(col)) {
        return col;
      }
    }
    return 0; // fallback
  };

  // Przypisujemy kolumnę (ważne: robimy to raz)
  const colIndex = findColumn();
  events[index].assignedCol = colIndex; // Zapisujemy, żeby następne eventy wiedziały

  const color = colors[colIndex % colors.length];
  const borderColor = borderColors[colIndex % borderColors.length];

  return (
    <div
      className="cal-event-object"
      style={{
        backgroundColor: color,
        borderColor: borderColor,
        top: `${startPos}px`,
        height: `${height}px`,
        left: `${(colIndex / 7) * 100}%`,
        width: `${(1 / 7) * 100}%`,
        boxSizing: "border-box",
        position: "absolute",
        zIndex: 10,
      }}
    >
      <span className="cal-event-title">{title}</span>
      <br />
      <span className="cal-event-duration">
        {start} - {end}
      </span>
    </div>
  );
}

export default CalEvent;
