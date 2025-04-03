// components/DroppableArea.tsx
import { useDrop } from "react-dnd";
import { ReactNode, useRef } from "react";

export const DroppableArea = ({
  children,
  moveCard,
}: {
  children: ReactNode;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [, drop] = useDrop({
    accept: "CARD",
    hover(item: { index: number }, monitor) {
      if (!containerRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = calculateHoverIndex(
        containerRef.current,
        monitor.getClientOffset()
      );

      console.log('Hover detected:', {
        dragIndex: item.index,
        hoverIndex,
        offset: monitor.getClientOffset(),
        childrenCount: containerRef.current?.children.length
      });

      if (dragIndex === hoverIndex || hoverIndex === -1) return;
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const calculateHoverIndex = (
    container: HTMLElement,
    offset: { x: number; y: number } | null
  ) => {
    if (!offset) return -1;

    

    const children = Array.from(container.children);
    return children.reduce<number>((closest, child, index) => {
      const rect = child.getBoundingClientRect();
      const verticalMiddle = rect.top + rect.height / 2;
      const horizontalMiddle = rect.left + rect.width / 2;

      // Check both X and Y coordinates
      const isBefore = offset.y < verticalMiddle && offset.x < horizontalMiddle;
      return isBefore && index < closest ? index : closest;
    }, children.length);
  };

  drop(containerRef);

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 w-full"
    >
      {children}
    </div>
  );
};
