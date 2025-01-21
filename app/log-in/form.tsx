'use client'

import { Button, Input } from "@nextui-org/react"
import { toast } from 'sonner'
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { logInSchema } from "@/actions/schemas"
import { buttonClasses, errorClasses, inputClasses } from "@/utils/classes"
import { handleServerError } from "@/utils/action-utils"
import { logIn } from "@/actions/log-in";
import { handleRedirect } from "@/utils/handle-redirect"

export const LogInForm = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (variables:z.infer<typeof logInSchema>) => {
      handleServerError(await logIn(variables))
    },
    onError: (error) => toast.error(error.message),
    onMutate: () => toast.loading('Logging in...'),
    onSuccess: () => {
      handleRedirect('/')
    },
  })
  
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<z.infer<typeof logInSchema>>({
    resolver: zodResolver(logInSchema),
  })

  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
      <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("email")}
            label="Email"
            name="email"
            required
          />
          {errors.email && <span className={errorClasses}>{errors.email.message}</span>}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register("password")}
            type="password"
            label="Password"
            required
          />
          {errors.password && <span className={errorClasses}>{errors.password.message}</span>}
        </div>
        <Button className={buttonClasses} type="submit" size="sm" disabled={isPending}>
          {isPending ? 'Logging in' : 'Log in'}
        </Button>
      </div>
    </form>
  )
}