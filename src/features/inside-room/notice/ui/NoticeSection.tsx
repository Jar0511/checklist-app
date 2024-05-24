import { useFetch } from "@/shared/lib"
import { AiFillNotification } from "react-icons/ai"
import { getNoticeList } from "../api"
import { Suspense } from "react"
import { CustomButton, SkeletonWrapper } from "@/shared/ui"
import { useAtomValue } from "jotai"
import { roomInfoAtom } from "@/entities/room"
import { Tables } from "@/shared/model/supabase"
import { MdAdd } from "react-icons/md"

const NoticeCard = ({
  content
} : Tables<"notice">) => {
  return (
    <div className="flex items-start gap-3 p-3 text-[0.875rem] font-medium rounded-md bg-grapefruit-50">
      <div className="text-white rounded-full bg-grapefruit-400 w-[28px] h-[28px] flex items-center justify-center">
        <AiFillNotification className="size-[16px]" />
      </div>
      <p className={`pt-1 flex-1`}>
        {content}
      </p>
    </div>
  )
}

const NoticeCardList = ({room_id}: {room_id: number}) => {
  const _notices = useFetch(getNoticeList, room_id);
  return (
    <section>
      {_notices?.length ?
        _notices.map((notice) =>
          <NoticeCard
            {...notice}
          />
        )
        :
        <div className="flex flex-wrap justify-center">
          <CustomButton btnstyle="inline">
            <MdAdd />
            신규 공지 작성하기
          </CustomButton>
        </div>
      }
    </section>
  )
}

export const NoticeSection = () => {
  const roomInfo = useAtomValue(roomInfoAtom);
  if(!roomInfo) {
    return (<></>)
  }

  return (
    <Suspense
      fallback={
        <SkeletonWrapper>
          <div className="w-full h-12 rounded-md" />
        </SkeletonWrapper>
      }
    >
      <NoticeCardList room_id={roomInfo?._id} />
    </Suspense>
  )
}