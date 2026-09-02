import { NextResponse } from 'next/server';

import { processEmailOutbox } from '@/lib/email/process-email-outbox';

async function processRequest(request: Request) {
  if (
    !process.env.CRON_SECRET ||
    request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const results = await processEmailOutbox(10);
    return NextResponse.json({ processed: results.length, results });
  } catch (error) {
    console.error('Email outbox processing failed', error);
    return NextResponse.json({ error: 'Email processing failed' }, { status: 500 });
  }
}

export const GET = processRequest;
export const POST = processRequest;
