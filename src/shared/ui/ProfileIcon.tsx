import { FaUser } from "react-icons/fa6";

export const ProfileIcon = ({url, bg, size = "sm"}: {url?: string | null; size?: "lg" | "sm"; bg?: string | null}) => {
  return (
    <div
      className={`${
          size == "lg" ? "w-[56px] h-[56px]" : "w-[32px] h-[32px]"
        } rounded-full overflow-hidden flex items-center justify-center`}
      style={{
        backgroundColor: bg ?? 'transparent'
      }}
    >
      {url ?
        <img src={url} /> :
        <FaUser />
      }
    </div>
  )
}