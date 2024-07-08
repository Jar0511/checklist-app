import { useFetch } from "@/shared/lib";
import { AiFillNotification } from "react-icons/ai";
import { getLatestNotice } from "../api";
import { Suspense, useState } from "react";
import { SkeletonWrapper } from "@/shared/ui";
import { useAtomValue } from "jotai";
import { roomInfoAtom } from "@/entities/room";
import { AddNewNoticeButton } from "./AddNoticeButton";

const NoticeCard = ({
  room_id,
  refresh,
}: {
  room_id: number;
  refresh: number;
}) => {
  const _notice = useFetch(
    getLatestNotice,
    room_id,
    refresh
  );
  if (_notice) {
    return (
      <div className="flex items-start gap-3 p-3 text-[0.875rem] font-medium rounded-md bg-grapefruit-400/10 dark:bg-grapefruit-900/50">
        <div className="text-white rounded-full bg-grapefruit-400 dark:bg-grapefruit-700 w-[28px] h-[28px] flex items-center justify-center">
          <AiFillNotification className="size-[16px]" />
        </div>
        <div className={`pt-1 flex-1 flex`}>
          <p className="flex-1 whitespace-pre-wrap">
            {_notice.content}
          </p>
          <p className="opacity-70">
            {_notice.created_at?.replace(/T.*/, "")}
          </p>
        </div>
      </div>
    );
  }
};

export const NoticeSection = () => {
  const [refresh, setRefresh] = useState(0);
  const roomInfo = useAtomValue(roomInfoAtom);
  if (!roomInfo) {
    return <></>;
  }

  return (
    <section className="flex flex-col gap-2">
      <Suspense
        fallback={
          <SkeletonWrapper>
            <div className="w-full h-12 rounded-md" />
          </SkeletonWrapper>
        }
      >
        <NoticeCard
          room_id={roomInfo._id}
          refresh={refresh}
        />
        <AddNewNoticeButton
          onSuccess={() => setRefresh((num) => num + 1)}
        />
      </Suspense>
    </section>
  );
};
