
import React from 'react';

interface VirtualDesktopsProps {
  desktops: any[];
  currentDesktop: number;
  onSwitchDesktop: (index: number) => void;
}

const VirtualDesktops: React.FC<VirtualDesktopsProps> = ({
  desktops,
  currentDesktop,
  onSwitchDesktop
}) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-40">
      <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-md rounded-full px-4 py-2">
        {desktops.map((desktop, index) => (
          <button
            key={index}
            onClick={() => onSwitchDesktop(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentDesktop === index
                ? 'bg-white scale-125'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            title={`Pulpit ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VirtualDesktops;
