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
    onSuccess: () => {
      toast.success('Pin deleted')
      handleRedirect('/')
    },
    onMutate: () => toast.loading('Deleting pin'),
    onSettled: () => {
      toast.dismiss()
      setOpen(false)
    },
  })

  return (
      <a onClick={() => mutate()}>
        Got picked up? <span className='underline underline-offset-2'>Delete pin</span>
      </a>
  )
}
