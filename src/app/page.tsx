'use client'

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Hammer,
  Loader2,
  MapPin,
  Maximize2,
  Menu,
  MessageCircleMore,
  PackageCheck,
  Pause,
  Phone,
  Play,
  Ruler,
  ShieldCheck,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { type FormEvent, useEffect, useMemo, useRef, useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { workImages } from '@/data/work-images'

const advantages = [
  {
    title: 'Точное основание',
    description: 'Подготовка пирога основания по нагрузке участка, чтобы покрытие не проседало.',
    icon: Ruler,
  },
  {
    title: 'Чистая геометрия',
    description: 'Ровные швы, аккуратные подрезки и соблюдение уклонов для отвода воды.',
    icon: Hammer,
  },
  {
    title: 'Гарантия на работы',
    description: 'Фиксируем объем, сроки и стоимость в договоре, предоставляем гарантию.',
    icon: ShieldCheck,
  },
]

const trustHighlights = [
  { value: '12+', label: 'лет в мощении' },
  { value: '300+', label: 'сданных объектов' },
  { value: '98%', label: 'приемка с первого раза' },
]

const steps = [
  'Выезд и бесплатный замер на объекте',
  'Смета и план укладки под ваш бюджет',
  'Подготовка основания и установка бордюра',
  'Укладка тротуарной плитки, трамбовка и расшивка швов',
  'Финальная приемка и рекомендации по уходу',
]

const stepIcons = [Phone, Ruler, PackageCheck, Hammer, CheckCircle2]

const faqs = [
  {
    q: 'Сколько стоит укладка тротуарной плитки?',
    a: 'Стоимость зависит от площади, типа основания, выбранной плитки и сложности рисунка. Точную цену даем после замера.',
  },
  {
    q: 'Сколько по времени идет работа?',
    a: 'В среднем 3-10 дней. Большие площади и сложная подготовка основания требуют больше времени.',
  },
  {
    q: 'Можно ли уложить плитку на старое основание?',
    a: 'Иногда можно, но только после осмотра. Если основание слабое, рекомендуем частичную или полную замену.',
  },
]

const pricingItems = [
  {
    service: 'Укладка на ЦПС на готовое бетонное основание',
    price: 'от 1 400 руб/м2',
    image: '/images/works/1.jpg',
  },
  {
    service: 'Укладка на плиточный клей (гребенка по двум сторонам камня)',
    price: 'от 1 800 руб/м2',
    image: '/images/works/20.jpg',
  },
  {
    service: 'Укладка на двухкомпонентный трассовый раствор',
    price: 'от 3 000 руб/м2',
    image: '/images/works/28.jpg',
  },
  {
    service: 'Укладка на почву с полной подготовкой основания (подушка 200 мм)',
    price: 'от 1 500 руб/м2 (площадки), от 1 600 руб/п.м. или м2 (пешеходные зоны)',
    image: '/images/works/30.jpg',
  },
  {
    service: 'Укладка клинкерной брусчатки на готовое монолитное основание на клей',
    price: 'от 2 500 руб/м2',
    image: '/images/works/27.jpg',
  },
  {
    service: 'Укладка натурального камня на готовое бетонное основание',
    price: 'от 2 200 руб/м2',
    image: '/images/works/31.jpg',
  },
  {
    service: 'Укладка полудрагоценного камня в эпоксиде по монолитному основанию',
    price: 'от 24 000 руб/м2 (полный цикл)',
    image: '/images/works/32.jpg',
  },
  {
    service: 'Установка садового бордюрного камня',
    price: 'от 500 руб/п.м.',
    image: '/images/works/33.jpg',
  },
  {
    service: 'Установка дорожного бордюрного камня',
    price: 'от 950 руб/п.м.',
    image: '/images/works/34.jpg',
  },
]

const heroVideos = ['/videos/main/1.mp4', '/videos/main/2.mp4', '/videos/main/3.mp4']

const navSections = [
  { href: '#hero', label: 'Главная' },
  { href: '#pricing', label: 'Цены' },
  { href: '#works', label: 'Примеры работ' },
  { href: '#advantages', label: 'Почему нас выбирают' },
  { href: '#process', label: 'Как проходит работа' },
  { href: '#lead-form', label: 'Оставить заявку' },
  { href: '#faq', label: 'FAQ' },
]

const web3FormsApiEndpoint = 'https://api.web3forms.com/submit'
const web3FormsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ?? ''
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') ?? ''
const yandexMetrikaId = 108266591
const phoneNumber = '+79671652525'
const fallbackPhoneDisplay = '+7 (967) 165-25-25'
const submissionLimitMessage = `Форма временно не работает из-за лимита заявок. Пожалуйста, позвоните по номеру ${fallbackPhoneDisplay}.`

const isSubmissionLimitError = (statusCode: number, rawMessage: string) => {
  if (statusCode === 429) return true

  const message = rawMessage.toLowerCase()
  const limitSignals = [
    'limit',
    'quota',
    'too many',
    'rate limit',
    'exceed',
    'submission',
    'credit',
    'upgrade',
    'лимит',
    'квот',
    'превыш',
  ]
  return limitSignals.some((signal) => message.includes(signal))
}

const trackYandexGoal = (goal: string, params: Record<string, string> = {}) => {
  if (typeof window === 'undefined') return

  const windowWithYm = window as Window & { ym?: (..._args: unknown[]) => void }
  if (typeof windowWithYm.ym === 'function') {
    windowWithYm.ym(yandexMetrikaId, 'reachGoal', goal, params)
  }

  const windowWithDataLayer = window as Window & { dataLayer?: Array<Record<string, unknown>> }
  if (Array.isArray(windowWithDataLayer.dataLayer)) {
    windowWithDataLayer.dataLayer.push({
      event: 'yandex_goal',
      goal,
      ...params,
    })
  }
}

type FormStatus = {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

const defaultFormStatus: FormStatus = { type: 'idle', message: '' }

const FormStatusBanner = ({ status }: { status: FormStatus }) => {
  if (status.type === 'idle') return null

  const config =
    status.type === 'loading'
      ? {
          icon: Loader2,
          containerClass:
            'border-primary/25 bg-primary/5 text-primary shadow-primary/10 animate-pulse',
          iconClass: 'animate-spin',
          label: 'Статус отправки',
        }
      : status.type === 'success'
        ? {
            icon: CheckCircle2,
            containerClass:
              'border-emerald-300/60 bg-emerald-50 text-emerald-800 shadow-emerald-100',
            iconClass: '',
            label: 'Успешно',
          }
        : {
            icon: AlertCircle,
            containerClass: 'border-rose-300/60 bg-rose-50 text-rose-800 shadow-rose-100',
            iconClass: '',
            label: 'Ошибка',
          }

  const Icon = config.icon

  return (
    <div
      aria-live="polite"
      className={`mt-1 flex items-start gap-2 rounded-xl border px-3 py-2 text-xs leading-relaxed shadow-sm transition-all sm:text-sm ${config.containerClass}`}
      role="status"
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.iconClass}`} />
      <div className="min-w-0">
        <p className="font-semibold">{config.label}</p>
        <p className="break-words">{status.message}</p>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [callFormService, setCallFormService] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarCompact, setIsNavbarCompact] = useState(false)
  const [leadFormStatus, setLeadFormStatus] = useState<FormStatus>(defaultFormStatus)
  const [callFormStatus, setCallFormStatus] = useState<FormStatus>(defaultFormStatus)
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isVideoPaused, setIsVideoPaused] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [videoCurrentTime, setVideoCurrentTime] = useState(0)
  const [selectedPricingItem, setSelectedPricingItem] = useState<{
    service: string
    price: string
    image: string
  } | null>(null)
  const [selectedWorkImage, setSelectedWorkImage] = useState<{ src: string } | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  const videoProgress = useMemo(() => {
    if (!videoDuration) return 0
    return Math.min(100, (videoCurrentTime / videoDuration) * 100)
  }, [videoCurrentTime, videoDuration])

  useEffect(() => {
    const onScroll = () => setIsNavbarCompact(window.scrollY > 40)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false)
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    if (!selectedWorkImage && !selectedPricingItem) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return

      if (selectedWorkImage) setSelectedWorkImage(null)
      if (selectedPricingItem) setSelectedPricingItem(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedPricingItem, selectedWorkImage])

  useEffect(() => {
    if (isCallModalOpen) {
      setCallFormStatus(defaultFormStatus)
    }
  }, [isCallModalOpen])

  useEffect(() => {
    const popupImageSources = [
      ...workImages.map((image) => image.src),
      ...pricingItems.map((item) => item.image),
    ]
    const uniquePopupImageSources = Array.from(new Set(popupImageSources))

    const preloadImages = () => {
      uniquePopupImageSources.forEach((src) => {
        const preloadedImage = new window.Image()
        preloadedImage.src = src
      })
    }

    if ('requestIdleCallback' in window) {
      const idleCallbackId = window.requestIdleCallback(() => preloadImages())
      return () => window.cancelIdleCallback(idleCallbackId)
    }

    const timeoutId = setTimeout(preloadImages, 200)
    return () => clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    video.currentTime = 0
    setVideoCurrentTime(0)
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setVideoDuration(video.duration)
    }
    video.play().catch(() => undefined)
    setIsVideoPaused(false)
  }, [activeVideoIndex])

  const toggleVideoPlayback = () => {
    const video = heroVideoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => undefined)
      setIsVideoPaused(false)
      return
    }

    video.pause()
    setIsVideoPaused(true)
  }

  const toggleVideoMute = () => {
    const video = heroVideoRef.current
    if (!video) return

    const nextMutedState = !isVideoMuted
    video.muted = nextMutedState
    setIsVideoMuted(nextMutedState)
  }

  const openCallModal = (service = '') => {
    setCallFormService(service)
    setIsCallModalOpen(true)
  }

  const handlePhoneClick = (placement: string) => {
    trackYandexGoal('phone_click', {
      placement,
      phone: phoneNumber,
    })
  }

  const submitLead = async (event: FormEvent<HTMLFormElement>, source: 'main' | 'modal') => {
    event.preventDefault()

    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = {
      source,
      name: String(formData.get('name') ?? '').trim(),
      phone: String(formData.get('phone') ?? '').trim(),
      service: String(formData.get('service') ?? '').trim(),
      comment: String(formData.get('comment') ?? '').trim(),
      consent: formData.get('consent') === 'on',
    }

    if (source === 'main') {
      setLeadFormStatus({ type: 'loading', message: 'Отправляем заявку...' })
    } else {
      setCallFormStatus({ type: 'loading', message: 'Отправляем заявку...' })
    }

    if (!web3FormsAccessKey) {
      const configError =
        'Форма временно недоступна: не настроена NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY.'
      if (source === 'main') {
        setLeadFormStatus({ type: 'error', message: configError })
      } else {
        setCallFormStatus({ type: 'error', message: configError })
      }
      return
    }

    const sourceLabel =
      source === 'modal' ? 'Модальное окно «Заказать звонок»' : 'Основная форма «Оставить заявку»'
    try {
      const submittedAt = new Intl.DateTimeFormat('ru-RU', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Europe/Moscow',
      }).format(new Date())

      const web3FormsPayload: Record<string, string> = {
        access_key: web3FormsAccessKey,
        subject: `🟢 Новая заявка ARTIS`,
        from_name: 'ARTIS | Заявка с сайта',
        'Имя клиента': payload.name,
        Телефон: payload.phone,
      }
      if (payload.comment) web3FormsPayload.Комментарий = payload.comment
      if (payload.service) web3FormsPayload.Услуга = payload.service
      web3FormsPayload.Источник = sourceLabel
      web3FormsPayload['Дата отправки'] = submittedAt
      web3FormsPayload['Сайт компании'] = siteUrl || 'Не указан'
      web3FormsPayload.botcheck = ''

      const response = await fetch(web3FormsApiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3FormsPayload),
      })
      const responseText = await response.text()
      let responsePayload: { message?: string; success?: boolean } = {}
      try {
        responsePayload = JSON.parse(responseText) as { message?: string; success?: boolean }
      } catch {
        responsePayload = {}
      }

      if (!response.ok || !responsePayload.success) {
        const apiErrorMessage =
          responsePayload.message ?? 'Не удалось отправить заявку через Web3Forms.'

        if (isSubmissionLimitError(response.status, apiErrorMessage)) {
          throw new Error(submissionLimitMessage)
        }

        throw new Error(apiErrorMessage)
      }

      const successMessage = 'Заявка отправлена. Мы скоро свяжемся с вами.'
      trackYandexGoal('form_submit', {
        source: source === 'main' ? 'main_form' : 'callback_modal',
      })
      if (source === 'main') {
        setLeadFormStatus({ type: 'success', message: successMessage })
      } else {
        setCallFormStatus({ type: 'success', message: successMessage })
        setCallFormService('')
        setTimeout(() => setIsCallModalOpen(false), 900)
      }

      form.reset()
    } catch (error) {
      const failMessage =
        error instanceof Error ? error.message : 'Ошибка отправки. Попробуйте еще раз.'
      if (source === 'main') {
        setLeadFormStatus({ type: 'error', message: failMessage })
      } else {
        setCallFormStatus({ type: 'error', message: failMessage })
      }
    }
  }

  return (
    <main className="min-h-screen">
      <section
        id="hero"
        className="relative overflow-hidden border-b"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(13,54,28,0.5), rgba(23,91,44,0.3)), url('/images/bg/mainSection2.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <header className="fixed inset-x-0 top-0 z-40">
          <div className="container-shell">
            <div
              className={`relative rounded-b-2xl bg-white/95 px-4 shadow-lg backdrop-blur transition-all duration-300 sm:px-6 ${
                isNavbarCompact ? 'py-2' : 'py-3'
              }`}
            >
              <div className="flex items-center justify-between md:hidden">
                <div className="flex items-center justify-center rounded-full border-2 border-white bg-white px-4 py-2 shadow-md">
                  <Image
                    alt="Логотип ARTIS"
                    className="h-8 w-auto"
                    height={64}
                    priority
                    src="/images/logos/logo.png"
                    width={180}
                  />
                </div>

                <button
                  aria-controls="mobile-navigation"
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-white text-primary"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  type="button"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>

              <div className="hidden grid-cols-1 items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
                <div className="text-center md:text-left">
                  <p className="text-base font-medium text-foreground">Укладка тротуарной плитки</p>
                  <p className="text-sm text-muted-foreground">и благоустройство участков</p>
                </div>

                <div className="hidden md:block" />

                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    href="tel:+79671652525"
                    onClick={() => handlePhoneClick('header_desktop')}
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    +7 (967) 165-25-25
                  </a>
                  <a
                    aria-label="WhatsApp"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white"
                    href="https://wa.me/79671652525"
                  >
                    <MessageCircleMore className="h-4 w-4" />
                  </a>
                  <button
                    className={buttonVariants({ size: 'sm' })}
                    onClick={() => openCallModal()}
                    type="button"
                  >
                    Заказать звонок
                  </button>
                </div>
              </div>

              <div className="pointer-events-none absolute left-1/2 top-full hidden -translate-x-1/2 -translate-y-1/2 md:block">
                <div
                  className={`flex items-center justify-center rounded-full border-4 border-white bg-white shadow-xl transition-all duration-300 ${
                    isNavbarCompact ? 'h-24 w-24' : 'h-36 w-36'
                  }`}
                >
                  <Image
                    alt="Логотип ARTIS"
                    className={`${isNavbarCompact ? 'h-12' : 'h-16'} w-auto transition-all duration-300`}
                    height={220}
                    priority
                    src="/images/logos/logo.png"
                    width={220}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div
          className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 md:hidden ${
            isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <aside
            className={`absolute h-full overflow-y-auto inset-y-0 right-0 flex w-full max-w-[320px] flex-col border-l border-primary/10 bg-white px-5 pb-6 pt-5 shadow-2xl transition-transform duration-300 ${
              isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            id="mobile-navigation"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-primary/10 pb-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Навигация</p>
                <p className="text-xs text-muted-foreground">Разделы и быстрые действия</p>
              </div>
              <button
                aria-label="Закрыть меню"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-white text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
                type="button"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-5 grid gap-2">
              {navSections.map((item) => (
                <a
                  className="rounded-xl border border-primary/10 bg-secondary/30 px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5"
                  href={item.href}
                  key={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-6 rounded-2xl border border-primary/15 bg-secondary/35 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
                Контакты
              </p>
              <a
                className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                href="tel:+79671652525"
                onClick={() => handlePhoneClick('mobile_menu')}
              >
                <Phone className="h-4 w-4 text-primary" />
                +7 (967) 165-25-25
              </a>
              <div className="mt-4 flex items-center gap-3">
                <a
                  aria-label="WhatsApp"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white"
                  href="https://wa.me/79671652525"
                >
                  <MessageCircleMore className="h-4 w-4" />
                </a>
              </div>
              <button
                className={`${buttonVariants({ size: 'sm' })} mt-4 w-full`}
                onClick={() => {
                  openCallModal()
                  setIsMobileMenuOpen(false)
                }}
                type="button"
              >
                Заказать звонок
              </button>
            </div>
          </aside>
        </div>

        <div className="container-shell relative py-16 pt-32 sm:py-20 sm:pt-36">
          <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex min-w-0 flex-col gap-4">
              <div className="w-full rounded-3xl border border-primary/10 bg-white p-6 shadow-xl shadow-black/10 sm:p-8 lg:p-10">
                <p className="inline-flex rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  АРТИС | Мощение под ключ
                </p>
                <div className="mt-5 max-w-4xl space-y-6">
                  <h1 className="text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl">
                    <span className="block md:text-left text-center">
                      Профессиональная укладка тротуарной плитки под ключ
                    </span>
                  </h1>
                  <div className="flex flex-col sm:flex-row w-full flex-nowrap items-center gap-3 justify-around">
                    <p className="whitespace-nowrap text-md font-medium text-slate-700 sm:text-base">
                      Получите бесплатную <br /> консультацию!
                    </p>
                    <Button
                      className="h-12 whitespace-nowrap rounded-xl px-5 text-base font-semibold shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                      onClick={() => openCallModal()}
                      type="button"
                    >
                      Получить консультацию
                      <span className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-primary-foreground/30">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </Button>
                  </div>
                  <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <Clock3 className="h-4 w-4" />
                        Сроки
                      </p>
                      <p className="mt-1 text-sm text-slate-700">Старт за 1-3 дня после замера</p>
                    </div>
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <MapPin className="h-4 w-4" />
                        География
                      </p>
                      <p className="mt-1 text-sm text-slate-700">Москва и Московская область</p>
                    </div>
                    <div className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
                        <ShieldCheck className="h-4 w-4" />
                        Контроль
                      </p>
                      <p className="mt-1 text-sm text-slate-700">Приемка по этапам и фотоотчет</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-center flex-wrap items-center gap-2 pb-1 text-sm text-slate-700 sm:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white sm:px-3 px-2 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Бесплатный замер
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white sm:px-3 px-2 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Гарантия
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white sm:px-3 px-2 py-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" /> Фиксированная смета
                </span>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[320px] rounded-2xl border border-white/20 bg-black/30 p-3 backdrop-blur lg:mx-0 lg:justify-self-center">
              <div className="relative overflow-hidden rounded-xl border border-white/15 bg-black/40">
                <video
                  autoPlay
                  className="aspect-[9/16] w-full object-cover"
                  loop={false}
                  muted={isVideoMuted}
                  onEnded={() => setActiveVideoIndex((prev) => (prev + 1) % heroVideos.length)}
                  onLoadedMetadata={(event) => setVideoDuration(event.currentTarget.duration || 0)}
                  onPause={() => setIsVideoPaused(true)}
                  onPlay={() => setIsVideoPaused(false)}
                  onTimeUpdate={(event) =>
                    setVideoCurrentTime(event.currentTarget.currentTime || 0)
                  }
                  playsInline
                  ref={heroVideoRef}
                  src={heroVideos[activeVideoIndex]}
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 bg-black/45 text-white backdrop-blur hover:bg-black/60"
                    onClick={toggleVideoPlayback}
                    type="button"
                  >
                    {isVideoPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </button>
                  <button
                    className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/30 bg-black/45 text-white backdrop-blur hover:bg-black/60"
                    onClick={toggleVideoMute}
                    type="button"
                  >
                    {isVideoMuted ? (
                      <VolumeX className="h-4 w-4" />
                    ) : (
                      <Volume2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-3 space-y-3 text-white">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/25">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-150"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>

                <div className="flex items-center justify-center gap-2">
                  {heroVideos.map((_, index) => (
                    <button
                      aria-label={`Видео ${index + 1}`}
                      className={`h-2.5 w-2.5 rounded-full transition ${activeVideoIndex === index ? 'bg-primary' : 'bg-white/45 hover:bg-white/70'}`}
                      key={`hero-video-${index + 1}`}
                      onClick={() => setActiveVideoIndex(index)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-14 sm:py-16" id="pricing">
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight">Цены</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pricingItems.map((item) => (
            <article className="overflow-hidden rounded-xl border bg-card" key={item.service}>
              <div className="relative">
                <div
                  className="h-44 w-full bg-cover bg-center sm:h-52"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                  }}
                />
                <button
                  aria-label={`Открыть фото: ${item.service}`}
                  className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur hover:bg-black/60"
                  onClick={() => setSelectedPricingItem(item)}
                  type="button"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">{item.service}</p>
                <p className="mt-3 text-lg font-semibold text-primary">{item.price}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 via-secondary/70 to-accent/70 shadow-sm">
          <div className="flex items-center gap-2 border-b border-primary/20 px-4 py-3">
            <PackageCheck className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Стоимость материала
            </p>
          </div>
          <div className="space-y-2 px-4 py-4 text-sm text-foreground">
            <p>
              Вибропрессованная брусчатка нашего производства:
              <span className="font-semibold text-primary"> от 800 до 1 150 руб/м2</span> (в
              зависимости от формата и толщины).
            </p>
            <p>
              Российская брусчатка других производителей:
              <span className="font-semibold text-primary"> от 1 600 до 3 000 руб/м2</span>.
              Импортный клинкер:
              <span className="font-semibold text-primary"> около 100 евро/м2</span> с учетом
              доставки.
            </p>
          </div>
        </div>
      </section>

      <section className="py-10" id="works">
        <div className="container-shell mb-4">
          <h2 className="text-3xl font-semibold tracking-tight">Примеры работ</h2>
        </div>
        <div className="container-shell">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              '/images/works/23.jpg',
              '/images/works/20.jpg',
              '/images/works/26.jpg',
              '/images/works/4.jpg',
            ].map((imageSrc, index) => (
              <button
                className="block w-full overflow-hidden rounded-lg border bg-card text-left"
                key={imageSrc}
                onClick={() => setSelectedWorkImage({ src: imageSrc })}
                type="button"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={`Пример работы ${index + 1}`}
                  className="h-64 w-full object-cover object-center sm:h-72 lg:h-80"
                  loading="eager"
                  src={imageSrc}
                />
              </button>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <Link
              className={`${buttonVariants({ variant: 'secondary', size: 'lg' })} group gap-2`}
              href="/portfolio"
            >
              Смотреть все работы
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-current/25 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20" id="advantages">
        <div className="pointer-events-none absolute inset-0">
          <div className="why-float absolute -left-10 top-8 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          <div className="why-float absolute right-4 top-1/3 h-52 w-52 rounded-full bg-emerald-300/20 blur-3xl [animation-delay:1.2s]" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-primary/10 to-transparent" />
        </div>

        <div className="container-shell relative">
          <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-primary/20 bg-white/70 p-6 backdrop-blur-sm lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                Контроль качества
              </p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Почему нас выбирают
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Работаем не «как получится», а по технологической карте: основание, геометрия,
                водоотвод и аккуратная сдача объекта с фиксацией каждого этапа.
              </p>
            </div>

            <div className="rounded-xl border border-primary/25 bg-gradient-to-br from-white to-secondary/70 px-5 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary/80">
                Результат для клиента
              </p>
              <p className="mt-1 text-2xl font-semibold text-primary">Ровно, надежно, в срок</p>
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {trustHighlights.map((item, index) => (
              <div
                className="why-card-entry rounded-xl border border-primary/20 bg-white/80 px-4 py-3 text-center shadow-sm backdrop-blur-sm"
                key={item.label}
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-2xl font-semibold leading-none text-primary">{item.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {advantages.map(({ title, description, icon: Icon }, index) => (
              <Card
                className="why-card-entry group relative overflow-hidden border-primary/20 bg-white/85 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
                key={title}
                style={{ animationDelay: `${index * 140 + 120}ms` }}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/70 via-emerald-300/90 to-primary/70 opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                <CardHeader className="pb-4">
                  <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-xl">{title}</CardTitle>
                  <CardDescription className="text-[15px] leading-relaxed text-foreground/80">
                    {description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Контроль на каждом этапе, фото-отчеты и аккуратная сдача объекта.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="process"
        className="border-y"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(235,246,237,0.95), rgba(230,243,233,0.95)), url('https://source.unsplash.com/1400x900/?paving,walkway')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-shell py-16 sm:py-20">
          <div className="mx-auto max-w-6xl rounded-2xl border border-primary/20 bg-white/85 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
              <div className="relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/60 to-emerald-100/70 p-4 sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                  Этапы работ
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight">Как проходит работа</h2>
                <p className="mt-3 max-w-md text-sm text-muted-foreground">
                  Прозрачный процесс от первого звонка до финальной сдачи объекта. Ниже можно
                  разместить фото вашего процесса работ.
                </p>
                <div className="mt-6 overflow-hidden rounded-xl border border-primary/25 bg-white/55">
                  <Image
                    alt="Процесс выполнения работ"
                    className="h-[240px] w-full object-cover"
                    height={240}
                    src="/images/bg/howWorkGoing.jpg"
                    width={720}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                {steps.map((step, index) => {
                  const Icon = stepIcons[index % stepIcons.length]

                  return (
                    <div
                      className="group relative overflow-hidden rounded-xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                      key={step}
                    >
                      <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/80 to-emerald-400/80 opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
                      <div className="flex items-start gap-3 pl-2">
                        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-primary/85">
                            Шаг {index + 1}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/90">{step}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="overflow-x-clip border-y"
        id="lead-form"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(245, 248, 243, 0.9), rgba(245, 248, 243, 0.9)), url('/images/bg/bgUnderFormContact.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="container-shell py-12 sm:py-16">
          <div className="mx-auto w-full max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border bg-white/95 p-4 shadow-xl backdrop-blur sm:max-w-6xl sm:p-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_1.05fr] lg:items-stretch">
              <div className="min-w-0 w-full overflow-hidden rounded-xl border border-primary/20 bg-secondary/40 lg:min-h-[420px]">
                <Image
                  alt="Пример выполненных работ"
                  className="block h-[260px] w-full max-w-full object-cover sm:h-[320px] lg:h-full lg:min-h-[420px]"
                  height={840}
                  src="/images/bg/contactBg.jpg"
                  width={720}
                />
              </div>

              <div className="min-w-0 overflow-hidden rounded-xl bg-white/70 p-2 sm:p-4">
                <h2 className="break-words text-2xl font-semibold tracking-tight sm:text-4xl">
                  Оставьте заявку и узнайте точную цену на вашу услугу
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Мы перезвоним в течение 1 часа и согласуем удобное время для консультации.
                </p>

                <form
                  aria-busy={leadFormStatus.type === 'loading'}
                  className="mt-6 grid w-full min-w-0 max-w-full gap-3"
                  onSubmit={(event) => submitLead(event, 'main')}
                >
                  <input
                    autoComplete="off"
                    className="hidden"
                    name="botcheck"
                    tabIndex={-1}
                    type="text"
                  />
                  <input
                    className="block h-11 w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                    name="name"
                    placeholder="Ваше имя"
                    required
                    type="text"
                  />
                  <input
                    className="block h-11 w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                    name="phone"
                    placeholder="+7 (___) ___-__-__"
                    required
                    type="tel"
                  />
                  <textarea
                    className="block min-h-[96px] w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 py-2 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                    name="comment"
                    placeholder="Кратко опишите задачу (необязательно)"
                  />
                  <label className="flex w-full min-w-0 max-w-full items-start gap-2 text-xs leading-5 text-muted-foreground">
                    <input className="mt-0.5 shrink-0" name="consent" required type="checkbox" />
                    <span className="block w-full min-w-0 break-words">
                      Согласен на{' '}
                      <Link className="underline" href="/privacy-policy">
                        обработку персональных данных
                      </Link>
                      .
                    </span>
                  </label>
                  <Button
                    className="mt-2 h-12 w-full max-w-full md:text-base text-sm"
                    disabled={leadFormStatus.type === 'loading'}
                    type="submit"
                  >
                    {leadFormStatus.type === 'loading' ? (
                      <span className="inline-flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Отправляем заявку...
                      </span>
                    ) : (
                      'Получить бесплатную консультацию'
                    )}
                  </Button>
                  <FormStatusBanner status={leadFormStatus} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16 sm:py-20" id="faq">
        <div className="overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-white via-emerald-50/40 to-secondary/55 shadow-lg">
          <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-xl border border-primary/15 bg-white/85 p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/75">
                FAQ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">Частые вопросы</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Собрали ответы на вопросы, которые чаще всего задают перед стартом работ. Если не
                нашли нужное, оставьте заявку и мы проконсультируем.
              </p>
              <div className="mt-5 grid gap-2 text-sm">
                <p className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                  Бесплатный выезд на замер
                </p>
                <p className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
                  <CheckCircle2 className="h-4 w-4" />
                  Подробная смета до начала работ
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {faqs.map((item) => (
                <details
                  className="group rounded-xl border border-primary/15 bg-white/90 p-4 shadow-sm transition-colors duration-300 open:border-primary/35"
                  key={item.q}
                >
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                    <span className="inline-flex items-start gap-2 text-sm font-semibold text-foreground">
                      <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <MessageCircleMore className="h-3.5 w-3.5" />
                      </span>
                      {item.q}
                    </span>
                    <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/25 text-primary transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 border-t border-primary/10 pt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t bg-secondary/40">
        <div className="container-shell py-10">
          <div className="flex md:flex-row flex-col justify-between gap-6 items-center">
            <div className="flex sm:flex-row flex-col gap-4 items-center justify-center">
              <Image
                alt="Логотип ARTIS"
                className="h-12 w-auto"
                height={120}
                src="/images/logos/logo.png"
                width={260}
              />
              <p className="text-sm text-muted-foreground">
                Сделаем укладку тротуарной плитки
                <br />в Москве или МО под ключ
              </p>

              <div className="sm:ml-6 ml-0 flex flex-col justify-center sm:items-start items-center space-y-2 text-sm text-foreground">
                <a
                  className="inline-flex items-center gap-2 font-semibold"
                  href="tel:+79671652525"
                  onClick={() => handlePhoneClick('footer')}
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +7 (967) 165-25-25
                </a>{' '}
                <a className="inline-flex items-center gap-2" href="mailto:artis-plitka@yandex.ru">
                  <MessageCircleMore className="h-4 w-4 text-primary" />
                  artis-plitka@yandex.ru
                </a>
                <p className="inline-flex items-start gap-2 text-center sm:text-left">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>Офис: Москва, Волжский бульвар д.3 к.2, каб.2</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white"
                href="https://wa.me/79671652525"
              >
                <MessageCircleMore className="h-5 w-5" />
              </a>
              <button
                className={buttonVariants({ size: 'sm' })}
                onClick={() => openCallModal()}
                type="button"
              >
                Заказать звонок
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t pt-5 text-sm text-muted-foreground">
            <Link href="/privacy-policy">Политика конфиденциальности</Link>
            <p>© 2025, ARTIS</p>
          </div>
        </div>
      </footer>

      <button
        aria-label="Заказать звонок"
        className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-primary text-primary-foreground shadow-xl transition-transform hover:scale-105"
        onClick={() => openCallModal()}
        title="Заказать звонок"
        type="button"
      >
        <Phone className="h-6 w-6" />
      </button>

      {isCallModalOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
          onClick={() => setIsCallModalOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl border bg-background p-5 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold">Заказать звонок</h3>
              <button
                aria-label="Закрыть"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border hover:bg-secondary/70"
                onClick={() => setIsCallModalOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mb-4 text-sm text-muted-foreground">
              Оставьте контакты, и мы перезвоним в ближайшее время.
            </p>

            <form
              aria-busy={callFormStatus.type === 'loading'}
              className="grid w-full min-w-0 grid-cols-1 gap-3 [&>*]:max-w-full [&>*]:min-w-0 [&>*]:w-full"
              onSubmit={(event) => submitLead(event, 'modal')}
            >
              <input
                autoComplete="off"
                className="hidden"
                name="botcheck"
                tabIndex={-1}
                type="text"
              />
              <input
                className="block h-11 w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                name="name"
                placeholder="Ваше имя"
                required
                type="text"
              />
              <input
                className="block h-11 w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                name="phone"
                placeholder="+7 (___) ___-__-__"
                required
                type="tel"
              />
              <input
                className="block h-11 w-full min-w-0 max-w-full box-border rounded-md border bg-background px-3 text-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring"
                name="service"
                onChange={(event) => setCallFormService(event.currentTarget.value)}
                placeholder="Интересующая услуга (необязательно)"
                type="text"
                value={callFormService}
              />
              <label className="block w-full text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <input className="shrink-0" name="consent" required type="checkbox" />
                  <span>
                    Даю согласие на{' '}
                    <Link className="underline" href="/privacy-policy">
                      обработку персональных данных
                    </Link>
                    .
                  </span>
                </span>
              </label>
              <Button className="h-11" disabled={callFormStatus.type === 'loading'} type="submit">
                {callFormStatus.type === 'loading' ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Отправляем...
                  </span>
                ) : (
                  'Отправить'
                )}
              </Button>
              <FormStatusBanner status={callFormStatus} />
            </form>
          </div>
        </div>
      ) : null}

      {selectedWorkImage ? (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedWorkImage(null)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Закрыть фото"
              className="absolute right-2 top-2 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/80"
              onClick={() => setSelectedWorkImage(null)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="Увеличенный пример работы"
              className="max-h-[92vh] w-full rounded-xl object-contain"
              loading="eager"
              src={selectedWorkImage.src}
            />
          </div>
        </div>
      ) : null}

      {selectedPricingItem ? (
        <div
          className="fixed inset-0 z-[61] flex items-center justify-center bg-black/75 p-4"
          onClick={() => setSelectedPricingItem(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-2xl border bg-background shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              aria-label="Закрыть фото цены"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/65 text-white hover:bg-black/80"
              onClick={() => setSelectedPricingItem(null)}
              type="button"
            >
              <X className="h-4 w-4" />
            </button>
            <Image
              alt={selectedPricingItem.service}
              className="h-[320px] w-full object-cover sm:h-[420px]"
              height={420}
              loading="eager"
              priority
              src={selectedPricingItem.image}
              width={1200}
            />
            <div className="space-y-2 p-5">
              <p className="text-sm text-muted-foreground">{selectedPricingItem.service}</p>
              <p className="text-xl font-semibold text-primary">{selectedPricingItem.price}</p>
              <Button
                className="mt-2"
                onClick={() => {
                  openCallModal(selectedPricingItem.service)
                  setSelectedPricingItem(null)
                }}
                type="button"
              >
                Заказать звонок
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
