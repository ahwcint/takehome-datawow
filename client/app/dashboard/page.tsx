import Paper from "@/components/common/paper/paper";
import ListPost from "@/components/common/post/list-post";

export default function DashBoardPage() {
  return (
    <Paper className="bg-base-4 h-full flex flex-1/3 p-[2rem] pb-0">
      <div className="basis-[30%]" />
      <ListPost />
      <div className="basis-[30%]" />
    </Paper>
  );
}
