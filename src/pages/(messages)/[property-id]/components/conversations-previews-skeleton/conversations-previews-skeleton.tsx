const ConversationsPreviewsSkeleton = () => {
  return (
    <div className="flex h-full w-full animate-pulse flex-col gap-2">
      {Array.from({ length: 6 })
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex h-14 items-center gap-1 rounded-md border bg-secondary p-2"
          ></div>
        ))}
    </div>
  );
};

export default ConversationsPreviewsSkeleton;
