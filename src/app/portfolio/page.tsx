import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { buttonVariants } from '@/components/ui/button'
import { workImages } from '@/data/work-images'

export const metadata: Metadata = {
  title: 'Портфолио работ',
  description:
    'Портфолио работ по укладке тротуарной плитки, брусчатки и благоустройству участков ARTIS.',
}

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-secondary/20">
      <section className="w-full px-3 py-8 sm:px-5 sm:py-10 lg:px-8">
        <div className="mx-auto mb-6 flex w-full max-w-[1800px] flex-wrap items-center justify-between gap-4">
          <Link className={`${buttonVariants({ variant: 'secondary' })} gap-2`} href="/#works">
            <ArrowLeft className="h-4 w-4" />
            На главную
          </Link>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Портфолио работ</h1>
          </div>
        </div>

        <div className="mx-auto w-full max-w-[1800px] columns-1 gap-3 sm:columns-2 lg:columns-3 2xl:columns-4">
          {workImages.map((image, index) => (
            <div
              className="mb-3 break-inside-avoid overflow-hidden rounded-lg border bg-card"
              key={image.src}
            >
              <Image
                alt={`Пример работы ${index + 1}`}
                className="h-auto w-full"
                height={1200}
                loading="lazy"
                src={image.src}
                unoptimized
                width={1600}
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
