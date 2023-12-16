import { Album, PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { ICard, useCard } from "@/postContext.tsx";
import { useState } from "react";

const Header = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const { addCard } = useCard();

  const areInputsFilled = () => {
    return (
      title.trim() !== "" && description.trim() !== "" && author.trim() !== ""
    );
  };

  const onAddCard = () => {
    const addedCard: ICard = {
      id: crypto.randomUUID(),
      title: title,
      description: description,
      author: author,
    };
    addCard(addedCard);
    setTitle("");
    setDescription("");
    setAuthor("");
  };
  return (
    <div
      className={"h-16 bg-black top-0 flex items-center justify-between px-14 "}
    >
      <div className={"px-2 flex items-center"}>
        <Album className={"h-16 mr-2"} />
        <h1 className={"text-xl font-black"}>Post-Blog</h1>
      </div>
      <Dialog>
        <DialogTrigger
          className={
            "flex rounded-xl justify-center items-center py-3 bg-green-400  h-8  cursor-pointer hover:bg-green-500   w-9 transition duration-200"
          }
        >
          <PlusCircle />{" "}
        </DialogTrigger>
        <DialogContent className={"flex flex-col items-center justify-center"}>
          <DialogHeader>
            <DialogTitle>Create new post </DialogTitle>
          </DialogHeader>
          <div className={"w-80 my-2"}>
            <h1 className={"my-2"}>Title</h1>
            <Input
              className={"w-80 mb-4"}
              placeholder={"Input title"}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h1 className={"w-80 my-2"}>Description</h1>
            <Input
              className={"w-80 mb-4"}
              placeholder={"Input description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h1 className={"w-80 my-2"}>Author</h1>
            <Input
              className={"w-80 mb-4"}
              placeholder={"Input author"}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <DialogClose
              disabled={!areInputsFilled()}
              onClick={() => onAddCard()}
              className={"w-full mt-4"}
            >
              <Button className={"w-full"}>Create new post</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Header;
