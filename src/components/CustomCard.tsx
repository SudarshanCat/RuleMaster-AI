import React from "react";

interface CustomCardProps {
  title: string;
  description: string;
}

const CustomCard: React.FC<CustomCardProps> = ({ title, description }) => {
  return (
    <div className="p-4 rounded-lg shadow-md border bg-white">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CustomCard;
