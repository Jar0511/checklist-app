const Spinner = ({
  size
}: {
  /** pixel size */
  size?: number
}) => {
  const bgSize = Math.round((size ?? 50) * 0.24);
  return (
    <div
      className="animate-spinner loader aspect-[1]"
      style={{
        width: `${size ?? 50}px`,
        backgroundSize: `${bgSize}px ${bgSize}px`
      }}
    />
  )
}

export const LoadingPageFallback = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Spinner size={72} />
    </div>
  )
}