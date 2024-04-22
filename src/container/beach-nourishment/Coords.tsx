import { useState } from "react";

const Coord = ({ value }: { value: string }) => {
  return (
    <input style={{ padding: "4px" }} placeholder="xyz" defaultValue={value} />
  );
};
const Coords = () => {
  const [coords, setCoords] = useState(["0-0-0", "-10-0,0"]);
  const addCord = () => {
    setCoords((prev) => [...prev, "0-0-0"]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {coords.map((c) => (
        <Coord value={c} />
      ))}
      <button onClick={addCord}>Add Cord</button>
    </div>
  );
};
export default Coords;
