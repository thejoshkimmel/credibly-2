import { NextRequest, NextResponse } from 'next/server';
import Connection from '@/models/Connection';
import { connectToDatabase } from '@/lib/mongodb';

export async function PUT(req, { params }) {
  await connectToDatabase();
  const { id } = params;
  const connection = await Connection.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
  if (!connection) {
    return NextResponse.json({ error: 'Connection not found' }, { status: 404 });
  }
  return NextResponse.json(connection);
}
