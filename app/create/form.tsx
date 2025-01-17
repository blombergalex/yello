'use client'

import { Button, Switch } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Textarea } from '@nextui-org/input'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { handleServerError } from '@/utils/action-utils'
import { pinSchema } from '@/actions/schemas'
import { buttonClasses, errorClasses } from '@/utils/classes'
import { createPin } from '@/actions/create-pin'

export const CreateForm = () => {
  const [isSelected, setIsSelected] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<string>('')

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: z.infer<typeof pinSchema>) => {
      handleServerError(await createPin(variables))
    },
    onError: (error) => toast.error(error.message),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof pinSchema>>({
    resolver: zodResolver(pinSchema),
  })

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }

            const coordinates = `${pos.lat},${pos.lng}`
            setCoordinates(coordinates)
          }
        )
      } else {
        console.error(
          'Error getting coordinates. Geolocation is not supported by browser'
        )
      }
    }
    getLocation()
  }, [])

  console.log(coordinates)
  console.log(isSelected)

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex items-center w-screen flex-col gap-4 p-10 md:w-2/3"
    >
      <p>Position: {coordinates}</p>
          <input
        type="hidden"
        {...register('coordinates')}
        value={`${coordinates}`}
      />
      <Textarea
        {...register('description')}
        label="Name, surroundings, canopy color..."
      />
      {errors.content && (
        <span className={errorClasses}>{errors.content.message}</span>
      )}
      <Switch
        isSelected={isSelected}
        onValueChange={setIsSelected}
        color="danger"
        className="self-end"
      >
        {isSelected ? (
          <p className="text-red-700 uppercase">Injured</p>
        ) : (
          'Not injured'
        )}
      </Switch>
      <input type="hidden" {...register('injured')} value={`${isSelected}`} />
      <Button className={`${buttonClasses}`} type="submit">
        {isPending ? 'Uploading pin...' : 'Drop pin'}
      </Button>
    </form>
  )
}
