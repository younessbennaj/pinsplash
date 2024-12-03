function MasonryLayout<T>({
  items,
  renderItems,
}: {
  items: T[];
  renderItems: (item: T) => JSX.Element;
}) {
  return (
    <div>
      {items.map((item, index) => {
        return <div key={index}>{renderItems(item)}</div>;
      })}
    </div>
  );
}

export default MasonryLayout;
