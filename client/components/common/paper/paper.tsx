import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

export default function Paper({
  children,
  fullHeight,
  className,
}: PropsWithChildren & { fullHeight?: boolean; className?: string }) {
  return <div className={cn('w-full', fullHeight ? 'h-dvh' : '', className)}>{children}</div>;
}
