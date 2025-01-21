import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { deletePin } from '@/actions/delete-pin'
import { handleRedirect } from '@/utils/handle-redirect'

export const DeleteButton = ({
  pinId,
  setOpen,
}: {
  pinId: string
  setOpen: (state: boolean) => void
}) => {
  const { mutate } = useMutation({
    mutationFn: () => deletePin(pinId),
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Pin deleted'),
    onMutate: () => toast.loading('Deleting pin'),
    onSettled: () => {
      toast.dismiss()
      setOpen(false)
    },
  })

  const handleClick = () => {
    mutate()
    handleRedirect('/')
  }

  return (
      <a onClick={() => handleClick()}>
        Got picked up? Delete pin
      </a>
  )
}
