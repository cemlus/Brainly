import { useDrag } from "react-dnd"
import { Card, CardProps } from './Card';
import { useRef } from "react";

interface DraggableCardProps extends CardProps {
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void
}
export const DraggableCard = ({ index, moveCard, ...props }: DraggableCardProps) => {
    const dragRef = useRef<HTMLDivElement>(null);
    
    const [{ isDragging }, drag] = useDrag({
      type: 'CARD',
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      // Add preview options
      options: {
        dropEffect: 'move',
      },
    });
  
    console.log('Drag started:', {
        index: index,
        position: dragRef.current?.getBoundingClientRect()
      });
    // Connect drag ref to both element and preview
    drag(dragRef);
  
    return (
      <div
        ref={dragRef}
        style={{ 
          opacity: isDragging ? 0.7 : 1,
          transition: 'transform 0.2s ease',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        className="relative active:scale-95"
      >
        <Card {...props} />
        {isDragging && (
          <div className="absolute inset-0 border-2 border-indigo-500 rounded-lg" />
        )}
      </div>
    );
};