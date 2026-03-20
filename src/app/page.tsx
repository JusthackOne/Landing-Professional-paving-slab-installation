'use client'

import {
  CheckCircle2,
  Hammer,
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
  'Укладка плитки, трамбовка и расшивка швов',
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
    image: '/images/works/8.jpg',
  },
  {
    service: 'Укладка клинкерной брусчатки на готовое монолитное основание на клей',
    price: 'от 2 500 руб/м2',
    image: '/images/works/27.jpg',
  },
  {
    service: 'Укладка натурального камня на готовое бетонное основание',
    price: 'от 2 200 руб/м2',
    image: '/images/works/24.jpg',
  },
  {
    service: 'Укладка полудрагоценного камня в эпоксиде по монолитному основанию',
    price: 'от 24 000 руб/м2 (полный цикл)',
    image: '/images/works/26.jpg',
  },
  {
    service: 'Установка садового бордюрного камня',
    price: 'от 500 руб/п.м.',
    image: '/images/works/4.jpg',
  },
  {
    service: 'Установка дорожного бордюрного камня',
    price: 'от 950 руб/п.м.',
    image: '/images/works/19.jpg',
  },
]

const workImages = [
  { src: '/images/works/1.jpg', width: 576, height: 1280 },
  { src: '/images/works/2.jpg', width: 960, height: 1280 },
  { src: '/images/works/3.jpg', width: 960, height: 1280 },
  { src: '/images/works/4.jpg', width: 750, height: 1000 },
  { src: '/images/works/5.jpg', width: 1036, height: 1034 },
  { src: '/images/works/6.jpg', width: 1067, height: 807 },
  { src: '/images/works/7.jpg', width: 965, height: 1280 },
  { src: '/images/works/8.jpg', width: 970, height: 1280 },
  { src: '/images/works/9.jpg', width: 960, height: 1280 },
  { src: '/images/works/10.jpg', width: 960, height: 1280 },
  { src: '/images/works/11.jpg', width: 719, height: 1280 },
  { src: '/images/works/12.jpg', width: 960, height: 1280 },
  { src: '/images/works/13.jpg', width: 720, height: 1280 },
  { src: '/images/works/14.jpg', width: 960, height: 1280 },
  { src: '/images/works/15.jpg', width: 745, height: 1280 },
  { src: '/images/works/16.jpg', width: 720, height: 1280 },
  { src: '/images/works/17.jpg', width: 959, height: 1280 },
  { src: '/images/works/18.jpg', width: 756, height: 1008 },
  { src: '/images/works/19.jpg', width: 966, height: 1280 },
  { src: '/images/works/20.jpg', width: 972, height: 1280 },
  { src: '/images/works/21.jpg', width: 1079, height: 863 },
  { src: '/images/works/22.jpg', width: 1042, height: 807 },
  { src: '/images/works/23.jpg', width: 1080, height: 808 },
  { src: '/images/works/24.jpg', width: 1008, height: 756 },
  { src: '/images/works/25.jpg', width: 757, height: 1280 },
  { src: '/images/works/26.jpg', width: 1032, height: 774 },
  { src: '/images/works/27.jpg', width: 768, height: 1024 },
  { src: '/images/works/28.jpg', width: 960, height: 1280 },
  { src: '/images/works/29.jpg', width: 750, height: 1000 },
]

const heroVideos = ['/videos/main/1.mp4', '/videos/main/2.mp4', '/videos/main/3.mp4']

export default function HomePage() {
  const [isCallModalOpen, setIsCallModalOpen] = useState(false)
  const [callFormService, setCallFormService] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isNavbarCompact, setIsNavbarCompact] = useState(false)
  const [leadFormStatus, setLeadFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })
  const [callFormStatus, setCallFormStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })
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
  const [selectedWorkImage, setSelectedWorkImage] = useState<{
    src: string
    width: number
    height: number
  } | null>(null)
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
      setCallFormStatus({ type: 'idle', message: '' })
    }
  }, [isCallModalOpen])

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

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const responsePayload = (await response.json()) as { message?: string }

      if (!response.ok) {
        throw new Error(responsePayload.message ?? 'Не удалось отправить заявку.')
      }

      const successMessage = 'Заявка отправлена. Мы скоро свяжемся с вами.'
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
        className="relative overflow-hidden border-b"
        style={{
          backgroundImage:
            "linear-gradient(110deg, rgba(13,54,28,0.82), rgba(23,91,44,0.68)), url('/images/bg/mainSection.jpg')",
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
                <button
                  aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary/20 bg-white text-primary"
                  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                  type="button"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>

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
              </div>

              {isMobileMenuOpen ? (
                <div className="mt-3 grid gap-3 rounded-xl border border-primary/15 bg-white p-3 md:hidden">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    href="tel:+79999999999"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    +7 (999) 999-99-99
                  </a>
                  <div className="flex items-center gap-3">
                    <a
                      aria-label="WhatsApp"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white"
                      href="/"
                    >
                      <MessageCircleMore className="h-4 w-4" />
                    </a>
                    <a
                      aria-label="Telegram"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#24A1DE] text-white"
                      href="/"
                    >
                      <Image
                        alt="Telegram"
                        height={16}
                        src="/images/logos/Telegram.svg"
                        width={16}
                      />
                    </a>
                  </div>
                  <button
                    className={buttonVariants({ size: 'sm' })}
                    onClick={() => {
                      openCallModal()
                      setIsMobileMenuOpen(false)
                    }}
                    type="button"
                  >
                    Заказать звонок
                  </button>
                </div>
              ) : null}

              <div className="hidden grid-cols-1 items-center gap-3 md:grid md:grid-cols-[1fr_auto_1fr]">
                <div className="text-center md:text-left">
                  <p className="text-base font-medium text-foreground">Укладка плитки</p>
                  <p className="text-sm text-muted-foreground">и благоустройство участков</p>
                </div>

                <div className="hidden md:block" />

                <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                  <a
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                    href="tel:+79999999999"
                  >
                    <Phone className="h-4 w-4 text-primary" />
                    +7 (999) 999-99-99
                  </a>
                  <a
                    aria-label="WhatsApp"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white"
                    href="/"
                  >
                    <MessageCircleMore className="h-4 w-4" />
                  </a>
                  <a
                    aria-label="Telegram"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#24A1DE] text-white"
                    href="/"
                  >
                    <Image alt="Telegram" height={16} src="/images/logos/Telegram.svg" width={16} />
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

        <div className="container-shell relative py-16 pt-32 sm:py-20 sm:pt-36">
          <div className="grid items-start gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/90">
                АРТИС
              </p>
              <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
                Профессиональная укладка тротуарной плитки
              </h1>
              <p className="mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
                Работаем по Москве и области. Делаем долговечное покрытие с правильным основанием,
                аккуратной геометрией и четкими сроками.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a className={buttonVariants({ variant: 'secondary' })} href="tel:+79999999999">
                  +7 (999) 999-99-99
                </a>
              </div>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/85">
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Бесплатный замер
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Гарантия до 3 лет
                </span>
                <span className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" /> Фиксированная смета
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

      <section className="container-shell py-14 sm:py-16">
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
                    backgroundImage: `linear-gradient(180deg, rgba(15, 54, 27, 0.2), rgba(15, 54, 27, 0.45)), url('${item.image}')`,
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

      <section className="py-10">
        <div className="container-shell mb-4">
          <h2 className="text-3xl font-semibold tracking-tight">Примеры работ</h2>
        </div>
        <div className="w-full px-2 sm:px-4">
          <div className="columns-1 gap-2 sm:columns-2 lg:columns-3 xl:columns-4">
            {workImages.map((image, index) => (
              <button
                className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-lg border bg-card text-left"
                key={image.src}
                onClick={() => setSelectedWorkImage(image)}
                type="button"
              >
                <Image
                  alt={`Пример работы ${index + 1}`}
                  className="h-auto w-full"
                  height={image.height}
                  loading={index < 4 ? 'eager' : 'lazy'}
                  quality={72}
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  src={image.src}
                  width={image.width}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 sm:py-20">
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
                  className="mt-6 grid w-full min-w-0 max-w-full gap-3"
                  onSubmit={(event) => submitLead(event, 'main')}
                >
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
                    Получить бесплатную консультацию
                  </Button>
                  {leadFormStatus.type !== 'idle' ? (
                    <p
                      className={`break-words text-xs ${
                        leadFormStatus.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                      }`}
                    >
                      {leadFormStatus.message}
                    </p>
                  ) : null}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16 sm:py-20">
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <Image
                alt="Логотип ARTIS"
                className="h-12 w-auto"
                height={120}
                src="/images/logos/logo.png"
                width={260}
              />
              <p className="mt-2 text-sm text-muted-foreground">
                Сделаем укладку плитки
                <br />в Москве или МО под ключ
              </p>
            </div>

            <div className="text-sm text-foreground">
              <p>ИП Богданов Александр Леонидович</p>
              <p className="mt-1">ИНН 780418594007</p>
              <p className="mt-1">ОГРН ИП 323784700334237</p>
            </div>

            <div className="space-y-2 text-sm text-foreground">
              <a className="inline-flex items-center gap-2 font-semibold" href="tel:+78124437373">
                <Phone className="h-4 w-4 text-primary" />
                +7 (812) 443-73-73
              </a>
              <a className="inline-flex items-center gap-2" href="mailto:artis-master@yandex.ru">
                <MessageCircleMore className="h-4 w-4 text-primary" />
                artis-master@yandex.ru
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <a
                aria-label="WhatsApp"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366] text-white"
                href="/"
              >
                <MessageCircleMore className="h-5 w-5" />
              </a>
              <a
                aria-label="Telegram"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#24A1DE] text-white"
                href="/"
              >
                <Image alt="Telegram" height={20} src="/images/logos/Telegram.svg" width={20} />
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
              className="grid w-full min-w-0 grid-cols-1 gap-3 [&>*]:max-w-full [&>*]:min-w-0 [&>*]:w-full"
              onSubmit={(event) => submitLead(event, 'modal')}
            >
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
              <Button disabled={callFormStatus.type === 'loading'} type="submit">
                Отправить
              </Button>
              {callFormStatus.type !== 'idle' ? (
                <p
                  className={`text-xs ${
                    callFormStatus.type === 'success' ? 'text-emerald-700' : 'text-red-600'
                  }`}
                >
                  {callFormStatus.message}
                </p>
              ) : null}
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
            <Image
              alt="Увеличенный пример работы"
              className="max-h-[92vh] w-full rounded-xl object-contain"
              height={selectedWorkImage.height}
              priority
              quality={85}
              sizes="100vw"
              src={selectedWorkImage.src}
              width={selectedWorkImage.width}
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
