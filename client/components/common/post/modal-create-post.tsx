"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useRef, useState } from "react";
import SelectCustom from "../select-custom/select-custom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createPost } from "@/service/post.service";
import { toast } from "sonner";

export default function ModalCreatePost({
  children,
  postId,
}: {
  children: ReactNode;
  postId?: string;
}) {
  const btnCloseRef = useRef<HTMLButtonElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [payload, setPayload] = useState({
    community: "",
  });
  const [loading, setLoading] = useState(false);

  const handlePost = () => {
    if (!payload.community) return toast.error("Community is required");
    if (!title) return toast.error("title is required");

    setLoading(true);
    createPost({ title, content, ...payload }).then((e) => {
      if (e.success) {
        toast.success("Create post success");
        handleClose();
      } else {
        toast.error(e.message || "Something went wrong");
      }
      setLoading(false);
    });
  };

  const handleClose = () => {
    if (!btnCloseRef.current) return;
    setPayload({ community: "" });
    btnCloseRef.current.click();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[35rem]">
        <DialogHeader>
          <DialogTitle className="pb-4">
            {postId ? "Edit Post" : "Create Post"}
          </DialogTitle>
          <SelectCustom
            className="border border-base-6 text-base-6! hover:text-base-2! w-fit"
            value={payload.community}
            placeholder="Choose a community"
            onChange={(community) =>
              setPayload((p) => ({
                ...p,
                community: community === "reset" ? "" : community,
              }))
            }
            list={[
              { value: "reset" },
              { value: "History" },
              { value: "Food" },
              { value: "Pets" },
              { value: "Health" },
              { value: "Fashion" },
              { value: "Exercise" },
              { value: "Others" },
            ]}
          />
          <DialogDescription>
            <Input
              className="mb-2"
              placeholder="Title"
              onChange={(e) => setTitle(e.currentTarget.value || "")}
              readOnly={loading}
            />
            <Textarea
              placeholder={"What's on your mind..."}
              cols={7}
              className="resize-none"
              onChange={(e) => setContent(e.currentTarget.value || "")}
              readOnly={loading}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button
              ref={btnCloseRef}
              className="w-[5rem] px-[3rem]"
              variant={"outline"}
            >
              Cancel
            </Button>
          </DialogTrigger>

          <Button
            className="w-[5rem] px-[3rem] bg-base-6"
            onClick={handlePost}
            disabled={loading}
          >
            Post
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
