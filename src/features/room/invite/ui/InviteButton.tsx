import { BasicButton, Modal, TabPanel } from "@/shared/ui"
import { useState, type ButtonHTMLAttributes } from "react";
import { MdAddLink } from "react-icons/md"

export const InviteButton = ({
  className,
} : ButtonHTMLAttributes<HTMLButtonElement>) => {
  const [type, setType] = useState<"time" | "count">("time");
  const modalID = "create_invitation";
  return (
    <>
      <Modal
        modal_id={modalID}
        outsideClose
      >
        <h3>초대 코드 생성</h3>
        <TabPanel
          tabs={[
            { children: "사용 횟수 제한", value: "count" },
            { children: "등록 시각 제한", value: "time" }
          ]}
          selectValue={type}
          setSelectValue={setType}
        />
      </Modal>
      <BasicButton
        className={`${className ?? ""} flex items-center`}
        title="초대 코드 생성"
        modal={modalID}
      >
        멤버 초대하기
        <MdAddLink />
      </BasicButton>
    </>
  )
}