import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  disabled?: boolean;
}

const Tooltip = ({ content, children, disabled = false }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top + rect.height / 2,
        left: rect.right + 12,
      });
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    updatePosition();
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 50);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (disabled) return <>{children}</>;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {isVisible &&
        createPortal(
          <div
            className="fixed z-[99999] -translate-y-1/2 pointer-events-none"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-sm font-medium text-white whitespace-nowrap shadow-2xl shadow-black/50 animate-fade-in">
              {content}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Tooltip;
