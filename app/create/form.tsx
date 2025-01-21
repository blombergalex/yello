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
  const [injured, setInjured] = useState<boolean>(false)
  const [coordinates, setCoordinates] = useState<string>('')

  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: z.infer<typeof pinSchema>) => {
      handleServerError(await createPin(variables))
      console.log(variables)
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => toast.success('Pin dropped, thank you!'),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
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
            setValue('coordinates', coordinates)
            setCoordinates(coordinates)
          }
        )
        console.log('location rendered: ', coordinates)
      } else {
        console.error(
          'Error getting coordinates. Geolocation is not supported by browser'
        )
      }
    }
    getLocation()
  }, [])

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex items-center w-screen flex-col gap-4 p-10 md:w-2/3"
    >
      <p><span className='text-gray-400'>Position</span> {coordinates}</p>
          <input
        type="hidden"
        {...register('coordinates')}
        value={`${coordinates}`}
      />
      {errors.coordinates && (
        <span className={errorClasses}>{errors.coordinates.message}</span>
      )}
      <Textarea
        {...register('description')}
        label="Name, surroundings, canopy color..."
      />
      {errors.description && (
        <span className={errorClasses}>{errors.description.message}</span>
      )}
      <Switch
        onValueChange={(value) => {
          setInjured(value)
          setValue('injured', `${value}`)
        }}
        color="danger"
        className="self-end"
      >
        {injured ? (
          <p className="text-red-700 uppercase">Injured</p>
        ) : (
          'Not injured'
        )}
      </Switch>
      <input type="hidden" {...register('injured')} value={`${injured}`} />
      {errors.injured && (
        <span className={errorClasses}>{errors.injured.message}</span>
      )}
      <Button className={`${buttonClasses}`} type="submit">
        {isPending ? 'Uploading pin...' : 'Drop pin'}
      </Button>
    </form>
  )
}
