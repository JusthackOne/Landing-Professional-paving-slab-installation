import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

type LeadPayload = {
  source?: 'main' | 'modal' | string
  name?: string
  phone?: string
  service?: string
  comment?: string
  consent?: boolean
}

const DESTINATION_EMAIL = 'rus.arslanov.85@internet.ru'

const escapeHtml = (value: string) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const asText = (value: unknown) => (typeof value === 'string' ? value.trim() : '')

const buildMailHtml = ({
  source,
  name,
  phone,
  service,
  comment,
}: {
  source: string
  name: string
  phone: string
  service: string
  comment: string
}) => {
  const createdAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return `
  <div style="margin:0;padding:24px;background:#f3f7f1;font-family:Arial,Helvetica,sans-serif;color:#182025;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;margin:0 auto;background:#ffffff;border:1px solid #dde8df;border-radius:16px;overflow:hidden;">
      <tr>
        <td style="padding:22px 24px;background:linear-gradient(135deg,#1f7a3d,#2fa251);color:#ffffff;">
          <p style="margin:0 0 6px 0;font-size:12px;letter-spacing:0.1em;text-transform:uppercase;opacity:0.9;">ARTIS</p>
          <h1 style="margin:0;font-size:24px;line-height:1.3;">Новая заявка с сайта</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:separate;border-spacing:0 10px;">
            <tr>
              <td style="width:160px;padding:10px 14px;background:#f7faf8;border:1px solid #e5efe8;border-radius:10px;font-size:13px;color:#486153;">Источник</td>
              <td style="padding:10px 14px;background:#ffffff;border:1px solid #e5efe8;border-radius:10px;font-size:14px;font-weight:600;">${escapeHtml(source)}</td>
            </tr>
            <tr>
              <td style="width:160px;padding:10px 14px;background:#f7faf8;border:1px solid #e5efe8;border-radius:10px;font-size:13px;color:#486153;">Имя</td>
              <td style="padding:10px 14px;background:#ffffff;border:1px solid #e5efe8;border-radius:10px;font-size:14px;font-weight:600;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="width:160px;padding:10px 14px;background:#f7faf8;border:1px solid #e5efe8;border-radius:10px;font-size:13px;color:#486153;">Телефон</td>
              <td style="padding:10px 14px;background:#ffffff;border:1px solid #e5efe8;border-radius:10px;font-size:14px;font-weight:600;">${escapeHtml(phone)}</td>
            </tr>
            <tr>
              <td style="width:160px;padding:10px 14px;background:#f7faf8;border:1px solid #e5efe8;border-radius:10px;font-size:13px;color:#486153;">Услуга</td>
              <td style="padding:10px 14px;background:#ffffff;border:1px solid #e5efe8;border-radius:10px;font-size:14px;font-weight:600;">${escapeHtml(service || 'Не указана')}</td>
            </tr>
            <tr>
              <td style="width:160px;padding:10px 14px;background:#f7faf8;border:1px solid #e5efe8;border-radius:10px;font-size:13px;color:#486153;vertical-align:top;">Комментарий</td>
              <td style="padding:10px 14px;background:#ffffff;border:1px solid #e5efe8;border-radius:10px;font-size:14px;line-height:1.5;">${escapeHtml(comment || 'Не указан')}</td>
            </tr>
          </table>

          <div style="margin-top:16px;padding:12px 14px;background:#f8fbf8;border:1px dashed #cfe0d4;border-radius:10px;color:#52685d;font-size:12px;line-height:1.5;">
            Время получения: ${escapeHtml(createdAt)} (МСК)
          </div>
        </td>
      </tr>
    </table>
  </div>`
}

const buildMailText = ({
  source,
  name,
  phone,
  service,
  comment,
}: {
  source: string
  name: string
  phone: string
  service: string
  comment: string
}) => {
  const createdAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Moscow',
    dateStyle: 'long',
    timeStyle: 'short',
  })

  return [
    'Новая заявка с сайта ARTIS',
    '',
    `Источник: ${source}`,
    `Имя: ${name}`,
    `Телефон: ${phone}`,
    `Услуга: ${service || 'Не указана'}`,
    `Комментарий: ${comment || 'Не указан'}`,
    `Время (МСК): ${createdAt}`,
  ].join('\n')
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as LeadPayload
    const name = asText(payload.name)
    const phone = asText(payload.phone)
    const service = asText(payload.service)
    const comment = asText(payload.comment)
    const source = payload.source === 'modal' ? 'Модальное окно' : 'Форма на главной'

    if (!name || !phone) {
      return NextResponse.json({ message: 'Заполните имя и телефон.' }, { status: 400 })
    }

    if (!payload.consent) {
      return NextResponse.json(
        { message: 'Нужно согласие на обработку персональных данных.' },
        { status: 400 },
      )
    }

    const host = process.env.SMTP_HOST
    const port = Number(process.env.SMTP_PORT ?? 465)
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASS
    const from = process.env.SMTP_FROM ?? `ARTIS <${user ?? 'no-reply@example.com'}>`

    if (!host || !user || !pass) {
      return NextResponse.json(
        { message: 'SMTP не настроен. Заполните SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS.' },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    })

    await transporter.sendMail({
      from,
      to: DESTINATION_EMAIL,
      subject: `Новая заявка: ${source}`,
      text: buildMailText({ source, name, phone, service, comment }),
      html: buildMailHtml({ source, name, phone, service, comment }),
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json(
      { message: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 500 },
    )
  }
}
