import { Button } from '@nextui-org/button'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

import { deletePin } from '@/actions/delete-pin'

export const DeleteButton = ({
  pinId,
  setOpen,
}: {
  pinId: string,
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
    }
  })

  return (
    <Button
      size="sm"
      radius="sm"
      className="bg-red-500"
      onPress={() => mutate()}
    >
      Delete pin
    </Button>
  )
}
