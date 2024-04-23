import { useEffect, useRef } from "react";
import katex from "katex";

const KaTeX = ({ texExpression }: { texExpression: string }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      katex.render(texExpression, containerRef.current);
    }
  }, [texExpression]);

  return <div style={{ fontSize: "24px" }} ref={containerRef} />;
};

export default KaTeX;
