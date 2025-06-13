'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function BlockDialog({ blockedUserId, blockedUserName }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleBlock = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/blocks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          blockedId: blockedUserId,
          reason,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setReason('');
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to block user');
      }
    } catch {
      setError('Failed to block user');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          Block User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Block {blockedUserName}</DialogTitle>
          <DialogDescription>
            Blocking this user will prevent them from interacting with you. You can unblock them
            later from your settings.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Reason (optional)</Label>
            <Textarea
              placeholder="Why are you blocking this user?"
              value={reason}
              onChange={e => setReason(e.target.value)}
              rows={3}
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">User blocked successfully!</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleBlock} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Block User
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
