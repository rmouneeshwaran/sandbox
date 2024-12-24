import React from "react";

interface CircleLoaderProps {
  size?: number; // Optional size for the loader
  color?: string; // Optional color
}

const CircleLoader: React.FC<CircleLoaderProps> = ({ size = 20, color = "text-white" }) => {
  return (
    <div
      className={`loader animate-spin rounded-full border-2 border-t-2 ${color}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderTopColor: "transparent",
        borderRightColor: "transparent",
      }}
    ></div>
  );
};

export default CircleLoader;
