function Loader({ message }: { message: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="h-6 w-6 animate-spin rounded-full border-t-2 border-l-2" />
      <h2 className="text-2xl">{message}</h2>
    </div>
  );
}

export default Loader;
