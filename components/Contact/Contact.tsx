'use client'
import { useState } from 'react'
import { useForm, Resolver } from 'react-hook-form'
import useWeb3Forms from '@web3forms/react'
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { Button, Container, SectionHead, Text } from '@/components/ui'
import LoadingCircle from '@/components/ui/LoadingCircle/LoadingCircle'
import axios from 'axios'
import { getRandomPairOfColors } from '@/lib/colors'
type FormValues = {
  name: string
  email: string
  message: string
  botcheck: boolean
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors: any = {}

  // Validate name
  if (!values.name) {
    errors.name = {
      type: 'required',
      message: 'Full name is required',
    }
  }

  // Validate email
  if (!values.email) {
    errors.email = {
      type: 'required',
      message: 'Email is required',
    }
  } else if (!/^\S+@\S+$/i.test(values.email)) {
    errors.email = {
      type: 'pattern',
      message: 'Please enter a valid email',
    }
  }

  // Validate message
  if (!values.message) {
    errors.message = {
      type: 'required',
      message: 'Message is required',
    }
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  }
}

export default function Contact({ settings }: { settings?: any }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormValues>({ resolver, mode: 'onTouched' })

  const [isSuccess, setIsSuccess] = useState(false)
  const [message, setMessage] = useState('')

  const apiKey = settings?.w3ckey || process.env.NEXT_PUBLIC_WEB3_ACCESS_KEY

  const { submit: onSubmit } = useWeb3Forms({
    access_key: apiKey,
    settings: {
      from_name: 'Dev Tamjid',
      subject: 'New Contact Message from DevTamjid Website',
    },
    onSuccess: (msg) => {
      setIsSuccess(true)
      setMessage(msg)
      // reset();
    },
    onError: (msg) => {
      setIsSuccess(false)
      setMessage(msg)
    },
  })

  const checkValidity = async (formData: FormValues) => {
    const { email } = formData
    try {
      const res = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.NEXT_PUBLIC_EMAIL_VALIDATION_API_KEY}&email=${email}`,
      )
      const { data } = res

      if (data.deliverability === 'UNDELIVERABLE') {
        setMessage(
          'The email address is undeliverable. Please check the email and try again.',
        )
      } else if (!data.is_valid_format.value) {
        setMessage('Please enter a valid email address.')
      } else if (data.is_disposable_email.value) {
        setMessage('Disposable email addresses are not allowed.')
      } else {
        onSubmit(formData) // Submit the form data after the email validation
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="grid my-10 md:grid-cols-2">
        <div className="my-10">
          <div className="max-w-sm">
            Have something to say? I am here to help. Fill up the form or send
            email or call phone.
          </div>

          <div className="mt-5">
            <div className="flex items-center mt-2 space-x-2 text-accent-4">
              <MapPinIcon className="w-4 h-4" />
              <span>Karamtola, Pubail, Gazipur - 1721</span>
            </div>
            {settings?.email && (
              <div className="flex items-center mt-2 space-x-2 text-accent-4">
                <EnvelopeIcon className="w-4 h-4" />
                <a href={`mailto:${settings.email}`}>{settings.email}</a>
              </div>
            )}
            {settings?.phone && (
              <div className="flex items-center mt-2 space-x-2 text-accent-4">
                <PhoneIcon className="w-4 h-4" />
                <a href={`tel:${settings.phone}`}>{settings.phone}</a>
              </div>
            )}
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(checkValidity)} className="my-10">
            <input
              type="checkbox"
              id=""
              className="hidden"
              style={{ display: 'none' }}
              {...register('botcheck')}
            />

            <div className="mb-5">
              <input
                type="text"
                placeholder="Full Name"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-accent-8 rounded-md outline-none   focus:ring-4  ${
                  errors.name
                    ? 'border-rose-600 focus:border-rose-600 ring-rose-100'
                    : 'border-accent-3 focus:border-accent-6 ring-accent-1 '
                }`}
                {...register('name')}
              />
              {errors.name && (
                <div className="mt-1 text-rose-600">
                  <small>{errors.name.message}</small>
                </div>
              )}
            </div>

            <div className="mb-5">
              <label htmlFor="email_address" className="sr-only">
                Email Address
              </label>
              <input
                id="email_address"
                type="email"
                placeholder="Email Address"
                autoComplete="false"
                className={`w-full px-4 py-3 border-2 placeholder:text-accent-8 rounded-md outline-none   focus:ring-4  ${
                  errors.email
                    ? 'border-rose-600 focus:border-rose-600 ring-rose-100'
                    : 'border-accent-3 focus:border-accent-6 ring-accent-1 '
                }`}
                {...register('email')}
              />
              {errors.email && (
                <div className="mt-1 text-rose-600">
                  <small>{errors.email.message}</small>
                </div>
              )}
            </div>

            <div className="mb-3">
              <textarea
                placeholder="Your Message"
                className={`w-full px-4 py-3 border-2 placeholder:text-accent-8   rounded-md outline-none  h-36 focus:ring-4  ${
                  errors.message
                    ? 'border-rose-600 focus:border-rose-600 ring-rose-100'
                    : 'border-accent-3 focus:border-accent-6 ring-accent-1 '
                }`}
                {...register('message')}
              />
              {errors.message && (
                <div className="mt-1 text-rose-600">
                  {' '}
                  <small>{errors.message.message}</small>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-accetext-accent-8 focus:outline-none focus:ring-offset-2 focus:ring focus:ring-gray-200 px-7 dark:bg-white dark:text-black "
            >
              {isSubmitting ? (
                <LoadingCircle className="text-accent-4" />
              ) : (
                'Send Message'
              )}
            </Button>
          </form>

          {isSubmitSuccessful && isSuccess && (
            <div className="mt-3 text-sm text-center text-green">
              {message || 'Success. Message sent successfully'}
            </div>
          )}
          {isSubmitSuccessful && !isSuccess && (
            <div className="mt-3 text-sm text-center text-rose-500">
              {message || 'Something went wrong. Please try later.'}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
