import { Heart, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ICard, useCard } from "@/postContext.tsx";
import { useEffect, useState } from "react";

const Card = () => {
  const { cards, updateCard, deleteCard } = useCard();
  const [editPost, setEditPost] = useState<ICard | null>(null);
  useEffect(() => {
    setEditPost(null);
  }, [cards]);
  const [title, setTitle] = useState<string>(editPost?.title || "");
  const [description, setDescription] = useState<string>(
    editPost?.description || "",
  );
  const [author, setAuthor] = useState<string>(editPost?.author || "");
  const areInputsFilled = () => {
    return (
      title.trim() !== "" && description.trim() !== "" && author.trim() !== ""
    );
  };
  const onEditClick = (post: ICard) => {
    setEditPost(post);
    setTitle(post.title);
    setDescription(post.description);
    setAuthor(post.author);
  };
  const onUpdateCard = (id: string) => {
    const updatedCards: ICard = {
      id: id,
      title: title,
      description: description,
      author: author,
    };
    updateCard(updatedCards);
    setTitle("");
    setDescription("");
    setAuthor("");
  };
  return (
    <div
      className={`${
        cards.length > 0 ? "cards-container" : "flex flex-col"
      }  text-white`}
    >
      {cards.length > 0 ? (
        cards.map((post) => (
          <div
            key={post.id}
            className={
              " pl-5 border bg-slate-900 flex flex-col items-start justify-between rounded-2xl h-80 w-full shadow-2xl p-3"
            }
          >
            <h1 className={"font-bold"}> {post.title}</h1>
            <p> {post.description}</p>
            <p> {post.author} </p>
            <div className={"flex w-full items-center justify-end "}>
              <Dialog>
                <DialogTrigger
                  className={"mx-2"}
                  onClick={() => onEditClick(post)}
                >
                  <div
                    className={
                      "flex rounded-xl justify-center items-center py-3 bg-slate-400  h-8  cursor-pointer hover:bg-slate-500    w-9 transition duration-200"
                    }
                  >
                    <Pencil />
                  </div>
                </DialogTrigger>
                <DialogContent
                  className={"flex flex-col items-center justify-center"}
                >
                  <DialogHeader>
                    <DialogTitle>Edit current post </DialogTitle>
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
                      className={"w-full"}
                      disabled={!areInputsFilled()}
                      onClick={() => onUpdateCard(post.id)}
                    >
                      <Button className={"w-full"}>Save</Button>
                    </DialogClose>
                    <DialogClose></DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
              <div
                onClick={() => deleteCard(post.id)}
                className={
                  "flex justify-center w-9 items-center  bg-red-400  h-8  cursor-pointer rounded-xl hover:bg-red-500  transition duration-200"
                }
              >
                <Trash2 />
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className={
            "flex flex-col py-2 items-center justify-center h-screen font-medium text-xl"
          }
        >
          <Heart className={"mb-4 text-red-500"} size={64} />
          Create your first post!{" "}
        </div>
      )}
    </div>
  );
};
export default Card;
