import type { ButtonHTMLAttributes } from "react"
import type { CommonButtonType } from "../model"
import { BasicButton } from "./Buttons"

export function TabPanel<T>({
  tabs,
  selectValue,
  setSelectValue,
  disabled
}: {
  tabs: Partial<(ButtonHTMLAttributes<HTMLButtonElement> & CommonButtonType)> & {value: T}[],
  selectValue: T,
  setSelectValue: (arg: T) => void,
  disabled?: boolean
}){
  return (
    <ul className="flex w-full border rounded-full border-neutral-500 dark:border-neutral-300">
      {tabs.map(({value, ...prop}, index) =>
        <li key={`tab_${index}`} className="flex-1 even:border-l border-neutral-500 dark:border-neutral-300">
          <BasicButton
            {...prop}
            onClick={() => setSelectValue(value)}
          />
        </li>
      )}
    </ul>
  )
}