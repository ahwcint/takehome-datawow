'use client';

import { Card } from '@/components/ui/card';
import Paper from '../paper/paper';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import ModalCreatePost from './modal-create-post';
import SelectCustom from '../select-custom/select-custom';
import { listPostApi } from '@/service/post.service';
import { SquareRoundCorner } from 'lucide-react';
import { cn } from '@/lib/utils';
type Post = { title: string; content?: string; community: string };
export default function ListPost() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({
    community: '',
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      listPostApi({
        page: 1,
        pageSize: 10,
        search,
        community: filter.community,
      }).then((i) => {
        if (i.success) setList(i.data as Post[]);
        setLoading(false);
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, filter]);
  return (
    <Paper className="h-[calc(100dvh-5rem)] flex flex-col overflow-y-auto p-1">
      <div className="flex gap-2 mb-6 basis-[3rem]">
        <Input
          className="grow bg-transparent"
          placeholder={'Search'}
          onChange={(e) => setSearch(e.currentTarget.value || '')}
        />
        <SelectCustom
          value={filter.community}
          placeholder="Community"
          onChange={(community) =>
            setFilter((p) => ({
              ...p,
              community: community === 'reset' ? '' : community,
            }))
          }
          list={[
            { value: 'reset' },
            { value: 'History' },
            { value: 'Food' },
            { value: 'Pets' },
            { value: 'Health' },
            { value: 'Fashion' },
            { value: 'Exercise' },
            { value: 'Others' },
          ]}
        />
        <ModalCreatePost>
          <Button className="bg-base-6">Create +</Button>
        </ModalCreatePost>
      </div>
      {loading && (
        <span className="text-center italic text-base-2 font-bold text-[1.5rem]">
          Loading . . .
        </span>
      )}
      {!list.length && !loading && (
        <div className="flex flex-col justify-center items-center rounded-full size-[5rem] border-2 p-2 mx-auto">
          <SquareRoundCorner color="white" />
          <p className="font-bold text-base-2 text-[0.7rem]">Not found</p>
        </div>
      )}
      <Card className={cn('p-[0]! h-fit overflow-auto gap-0', list.length ? '' : 'hidden')}>
        {list.map((i, index) => (
          <ul className="flex flex-col p-[1rem] border-b gap-2" key={index + i.title}>
            <li className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
              <span>Name</span>
            </li>
            <li>
              <Badge variant={'secondary'} className="text-base-5">
                {i.community || 'Unknown'}
              </Badge>
            </li>
            <li className="font-bold">{i.title}</li>
            <li className="line-clamp-2">{i.content}</li>
            <li className="text-[0.9rem] flex gap-1">
              <Button variant={'ghost'}>
                <Image src={'/assets/chat.svg'} width={15} height={15} alt="chat" />
                Comments
              </Button>
            </li>
          </ul>
        ))}
      </Card>
    </Paper>
  );
}
