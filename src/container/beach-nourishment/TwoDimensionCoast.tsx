import { useEffect, useRef } from "react";
import useProjectStore from "../../store/projectStore";

const TwoDimensionCoast = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLCanvasElement>(null);
  const shoreCoordinates = useProjectStore((state) => state.shoreCoordinates);
  useEffect(() => {
    if (ref.current) {
      ref.current.width = refContainer.current?.clientWidth || 0;
      const ctx = ref.current.getContext("2d");
      if (!ctx) return;
      const coordinates = shoreCoordinates;
      const mapCoordinates = (
        lat: number,
        lon: number,
        canvasWidth: number,
        canvasHeight: number
      ) => {
        // Define bounds
        const latMin = Math.min(...coordinates.map((coord) => coord[0]));
        const latMax = Math.max(...coordinates.map((coord) => coord[0]));
        const lonMin = Math.min(...coordinates.map((coord) => coord[1]));
        const lonMax = Math.max(...coordinates.map((coord) => coord[1]));

        // Scale the coordinates to fit within the canvas
        const x = ((lat - latMin) / (latMax - latMin)) * canvasWidth;
        const y =
          canvasHeight - ((lon - lonMin) / (lonMax - lonMin)) * canvasHeight;

        return { x, y };
      };

      // Begin path for poly lines
      ctx.beginPath();

      // Move to the first coordinate
      const { x, y } = mapCoordinates(
        coordinates[0][0],
        coordinates[0][1],
        ref.current.width,
        ref.current.height
      );
      ctx.moveTo(x, y);

      // Loop through the rest of the coordinates and draw lines to them
      for (let i = 1; i < coordinates.length; i++) {
        const { x, y } = mapCoordinates(
          coordinates[i][0],
          coordinates[i][1],
          ref.current.width,
          ref.current.height
        );
        ctx.lineTo(x, y);
        ctx.moveTo(x, y);
      }

      // Set styles and stroke the poly lines
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }, []);

  return (
    <div ref={refContainer} style={{ width: "100%" }}>
      <canvas
        width={500}
        height={400}
        style={{ backgroundColor: "#202020" }}
        ref={ref}
      ></canvas>
    </div>
  );
};
export default TwoDimensionCoast;
