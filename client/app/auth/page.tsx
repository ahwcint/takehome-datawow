'use client';

import SignInBtn from '@/components/common/auth/sign-in-button';
import Paper from '@/components/common/paper/paper';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export default function AuthPage() {
  const [username, setUsername] = useState<string>('');
  return (
    <Paper className={cn('bg-main-1 flex', 'flex-col-reverse', 'md:flex-row')} fullHeight>
      <Paper className="flex-1/2 shrink-0 flex">
        <div className="max-w-[384px] flex flex-col gap-4 m-auto w-full">
          <h1 className="text-base-2 mb-2 text-3xl font-semibold">Sign in</h1>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.currentTarget.value || '')}
          />
          <SignInBtn username={username} />
        </div>
      </Paper>
      <Paper className="bg-main-2 rounded-2xl flex-1/3 shrink-0 flex items-center justify-center flex-col">
        <Image width={100} height={100} className="w-[60%]" src="/icons/icon.svg" alt={'icon'} />
        <h1 className="text-base-2 text-3xl">a Board</h1>
      </Paper>
    </Paper>
  );
}
