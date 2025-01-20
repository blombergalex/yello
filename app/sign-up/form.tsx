'use client'

import { Button, Input } from '@nextui-org/react'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema } from '@/actions/schemas'
import { buttonClasses, errorClasses, inputClasses } from '@/utils/classes'
import { handleServerError } from '@/utils/action-utils'
import { signUp } from '@/actions/sign-up'

export const SignUpForm = () => { 
  const { mutate, isPending } = useMutation({
    mutationFn: async (variables: z.infer<typeof signUpSchema>) => {
      handleServerError(await signUp(variables))
    },
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success('Account created successfully, proceed to log in');
    },
  })
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  },
)
  
  return (
    <form
      onSubmit={handleSubmit((values) => mutate(values))}
      className="flex w-full flex-col max-w-md gap-4"
    >
      <div className="flex flex-col gap-4 items-center mx-4">
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register('email')}
            label="Email"
            name="email"
            required
          />
          {errors.email && (
            <span className={errorClasses}>{errors.email.message}</span>
          )}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register('username')}
            label="Username"
            required
          />
          {errors.username && (
            <span className={errorClasses}>{errors.username.message}</span>
          )}
        </div>
        <div className="w-2/3">
          <Input
            className={inputClasses}
            {...register('password')}
            type="password"
            label="Password"
            required
          />
          {errors.password && (
            <span className={errorClasses}>{errors.password.message}</span>
          )}
        </div>
        <Button className={buttonClasses} type="submit" size="sm">
          {isPending ? 'Creating...' : 'Sign up'}
        </Button>
      </div>
    </form>
  )
}
