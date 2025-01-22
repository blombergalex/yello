import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { deletePin } from '@/actions/delete-pin'
import { handleRedirect } from '@/utils/handle-redirect'
import { handleServerError } from '@/utils/action-utils'
import { Button } from '@nextui-org/react'

export const DeleteButton = ({
  pinId,
  setOpen,
}: {
  pinId: string
  setOpen: (state: boolean) => void
}) => {
  const { mutate } = useMutation({
    mutationFn: async () => {
      handleServerError(await deletePin(pinId))
    },
    onError: (error) => {
      toast.error(error.message)
      toast.dismiss()
    },
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
        <Button onPress={() => mutate()} className='bg-black text-white text-tiny h-fit p-2 rounded-small'>Delete</Button>
  )
}
