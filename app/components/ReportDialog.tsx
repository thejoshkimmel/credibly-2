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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function ReportDialog({ reportedUserId, reportedUserName }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!type || !description) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          reportedUserId,
          type,
          description,
        }),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          setOpen(false);
          setSuccess(false);
          setType('');
          setDescription('');
        }, 2000);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit report');
      }
    } catch {
      setError('Failed to submit report');
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Report User
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Report {reportedUserName}</DialogTitle>
          <DialogDescription>
            Please provide details about your report. This will be reviewed by our moderation team.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Report Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inappropriate_content">Inappropriate Content</SelectItem>
                <SelectItem value="harassment">Harassment</SelectItem>
                <SelectItem value="spam">Spam</SelectItem>
                <SelectItem value="fake_profile">Fake Profile</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder="Please provide details about your report..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">Report submitted successfully!</div>}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
