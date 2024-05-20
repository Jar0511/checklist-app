import { userAtom } from "@/entities/auth";
import { modalShowAtom, required, trimmed } from "@/shared/model";
import { Tables } from "@/shared/model/supabase";
import { CustomButton, CustomInput, Modal } from "@/shared/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { MdGroups } from "react-icons/md";
import { postNewRoom } from "../api";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";

export const CreateRoomButton = () => {
  const user = useAtomValue(userAtom);
  const setShow = useSetAtom(modalShowAtom);
  const revalidator = useRevalidator();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit
  } = useForm<Tables<"room">>();
  const nameRegister = register("room_nm", {required, setValueAs: trimmed});
  return (
    <>
      <Modal
        outsideClose
        actionButtons={
          <CustomButton type="submit" form="newRoomForm">확인</CustomButton>
        }
        loading={loading}
      >
        <h3>신규 방 생성</h3>
        <p>방 이름을 입력하세요</p>
        <form
          id={"newRoomForm"}
          onSubmit={handleSubmit(async ({room_nm}) => {
            if(user) {
              setLoading(true);
              await postNewRoom({
                room_nm,
                room_owner_id: user.user.id
              })
              setShow(false);
              revalidator.revalidate();
              setLoading(false);
            }
          })}
        >
          <CustomInput className="border-neutral-500" {...nameRegister} />
        </form>
      </Modal>
      <CustomButton
        modal
        btnstyle="inline"
        className="hover:bg-stone-500/15 dark:hover:bg-stone-300/25"
        onClick={() => setShow(true)}
        title="방 생성"
      >
        <MdGroups />
        신규 방 생성
      </CustomButton>
    </>
  )
}