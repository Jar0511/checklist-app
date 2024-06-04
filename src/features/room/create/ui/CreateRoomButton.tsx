import { userAtom } from "@/entities/auth";
import { modalShowAtom, required, trimmed } from "@/shared/model";
import type { Tables } from "@/shared/model/supabase";
import { CustomInput, CustomLabel, FilledButton, Modal } from "@/shared/ui";
import { useAtomValue, useSetAtom } from "jotai";
import { useForm } from "react-hook-form";
import { postNewRoom } from "../api";
import { useRevalidator } from "react-router-dom";
import { useState } from "react";
import { PiPlusCircleBold } from "react-icons/pi";

export const CreateRoomButton = () => {
  const user = useAtomValue(userAtom);
  const setShow = useSetAtom(modalShowAtom);
  const revalidator = useRevalidator();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {isValid, errors}
  } = useForm<Tables<"room">>();
  const nameRegister = register("room_nm", {required, setValueAs: trimmed});
  const descRegister = register("room_desc", {setValueAs: trimmed});
  return (
    <>
      <Modal
        modal_id="create_new_room"
        outsideClose
        actionButtons={
          <FilledButton
            btncolor="primary"
            type="submit"
            form="newRoomForm"
            disabled={!isValid}
          >
            확인
          </FilledButton>
        }
        loading={loading}
        align="left"
      >
        <h3>신규 방 생성</h3>
        <p>방 이름은 필수 정보입니다</p>
        <form
          id={"newRoomForm"}
          onSubmit={handleSubmit(async ({room_nm}) => {
            if(user) {
              setLoading(true);
              await postNewRoom({
                room_nm,
                room_owner_id: user.user.id
              })
              setLoading(false);
              revalidator.revalidate();
              setShow(null);
            }
          })}
          className="flex w-full gap-2"
        >
          <CustomLabel direction="portrait" required>
            <span>방 이름</span>
            <CustomInput className="border-neutral-500" {...nameRegister} err={errors?.room_nm?.message} />
          </CustomLabel>
          <CustomLabel direction="portrait">
            <span>설명</span>
            <CustomInput className="border-neutral-500" {...descRegister} />
          </CustomLabel>
        </form>
      </Modal>
      <FilledButton
        btncolor="primary"
        modal
        onClick={() => setShow("create_new_room")}
        title="방 생성"
      >
        <PiPlusCircleBold />
        신규 방 생성
      </FilledButton>
    </>
  )
}