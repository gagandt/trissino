import type React from 'react';

interface Props {
  text: string;
  icon: React.ReactNode;
}

const HoverColorChangeButton: React.FC<Props> = ({ text, icon }) => {
  return (
    <button
      type="submit"
      className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-primary hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
    >
      {text}
      {icon}
    </button>
  );
};

export default HoverColorChangeButton;
