import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

// Este é um exemplo de como implementar o webhook no Next.js
// No nosso caso, o backend FastAPI já está processando os webhooks
// Mas mantemos esta rota como redundância ou para processamento específico do frontend

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')
  
  if (!signature) {
    return new NextResponse('No signature', { status: 400 })
  }

  try {
    // Aqui você usaria stripe.webhooks.constructEvent se tivesse a lib instalada no frontend
    // const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
    
    const event = JSON.parse(body)

    console.log('🔔 Webhook recebido no Next.js:', event.type)

    // Encaminhar para o backend FastAPI se necessário, ou processar localmente
    // No CBF Manager, o backend FastAPI é o responsável pela persistência
    
    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error('❌ Erro no webhook do Next.js:', error.message)
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }
}
