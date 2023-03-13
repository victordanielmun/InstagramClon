import { useRecoilState } from "recoil"
import {modalState} from "../atom/modalAtom"

export default function UploadModal() {
    const [open, setOpen] = useRecoilState()
  return (
    <div>Upload Modal</div>
  )
}
