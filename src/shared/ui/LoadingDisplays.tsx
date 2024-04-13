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

export const LoadingFallback = ({
  screen,
  size
}:{
  /** 페이지 로딩 폴백 여부 */
  screen?: boolean;
  /** spinner size(pixel) */
  size?: number
}) => {
  return (
    <div className={`flex items-center justify-center ${screen ? 'w-screen h-screen' : 'w-full h-full'}`}>
      <Spinner size={size ? size : (screen ? 72 : 50)} />
    </div>
  )
}