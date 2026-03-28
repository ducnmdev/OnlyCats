'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { commentPost, deletePost, likePost } from "@/lib/api/post"
import { fetchUserProfile } from "@/lib/api/user"
import { cn } from "@/lib/utils"
import { PostType } from "@/types/post"
import { adminI } from "@/types/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Heart, ImageIcon, LockKeyholeIcon, MessageCircle, Trash } from "lucide-react"
import { CldVideoPlayer } from "next-cloudinary"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Comment from "./Comment"

const Post = ({ post, admin, isSubscribed }: { post: PostType, admin: adminI, isSubscribed: boolean }) => {
    const [isLiked, setIsLiked] = useState(false)
    const [comment, setComment] = useState("");

    const queryClient = useQueryClient();

    const { data: user } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchUserProfile,
    });

    const { mutate: deletePostMutation } = useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post deleted successfully");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { mutate: likePostMutation, isPending: isLiking } = useMutation({
        mutationFn: likePost,

        onMutate: async (postId: string) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const previousPosts = queryClient.getQueryData<PostType[]>(["posts"]);

            queryClient.setQueryData<PostType[]>(["posts"], (old) => {
                if (!old) return old;

                return old.map((p) =>
                    p.id === postId
                        ? {
                            ...p,
                            likes: isLiked ? p.likes - 1 : p.likes + 1,
                        }
                        : p
                );
            });

            setIsLiked((prev) => !prev);

            return { previousPosts };
        },

        onError: (_err, _vars, context) => {
            queryClient.setQueryData(["posts"], context?.previousPosts);
            setIsLiked((prev) => !prev);
            toast.error("Something went wrong.");
        },
    });

    const { mutate: commentPostMutation, isPending: isCommenting } = useMutation({
        mutationFn: commentPost,

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            setComment("");
            toast.success("Comment added successfully")
        },
        onError: (error) => {
            toast.error(error.message || "Something went wrong. Please try again.");
        },
    });

    const handleCommentSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!comment) return;
        commentPostMutation({
            postId: post.id,
            text: comment
        });
    };

    useEffect(() => {
        if (post.likesList && user?.id) {
            setIsLiked(post.likesList.some((like) => like.userId === user.id))
        }
    }, [post.likesList, user?.id])
    return (
        <div className="flex flex-col gap-3 p-3 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={admin?.image || "/user-placeholder.png"} className="object-cover" />
                        <AvatarFallback>MN</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm md:text-md">{admin?.name}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
                        17.06.2024
                    </p>

                    {admin?.id === user?.id && (
                        <Trash className="w-5 h-6 text-muted-foreground hover:text-red-500 cursor-pointer"
                            onClick={() => deletePostMutation(post.id)}
                        />
                    )}
                </div>
            </div>

            <p className="text-sm md:text-md">{post.text}</p>

            {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === 'image' && (
                <div className="relative w-full pb-[56.25%] rounded-lg overflow-hidden">
                    <Image
                        src={post.mediaUrl}
                        alt='Post Image'
                        className="rounded-lg object-cover"
                        fill
                    />
                </div>
            )}

            {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === "video" && (
                <div className='w-full mx-auto'>
                    <CldVideoPlayer
                        key={post.id}
                        width="960"
                        height={540}
                        className="rounded-md"
                        src={post.mediaUrl}
                    />
                </div>
            )}

            {!isSubscribed && !post.isPublic && (
                <div className="w-full bg-slate-800 relative h-96 rounded-md bg-of flex flex-col justify-center items-center px-5 overflow-hidden">
                    <LockKeyholeIcon className="w-16 h-16 text-zinc-400 mb-20 z-0" />
                    <div
                        aria-hidden='true'
                        className="opacity-60 absolute top-o left-0 w-full h-full bg-stone-800"
                    />

                    <div className="flex flex-col gap-2 z-10 border p-2 border-gray-500 w-full rounded">
                        <div className="flex gap-1 items-center">
                            <ImageIcon className="w-4 h-4" />
                            <span className="text-xs">1</span>
                        </div>

                        <Link
                            className={buttonVariants({
                                className: "rounded-full! w-full font-bold text-white"
                            })}
                            href={'/pricing'}
                        >
                            Subscribe to unlock
                        </Link>
                    </div>
                </div>
            )}

            <div className="flex gap-4">
                <div className="flex gap-1 items-center">
                    <Heart
                        className={cn('w-5 h-5 cursor-pointer', { 'text-red-500': isLiked, 'fill-red-500': isLiked })}
                        onClick={() => {
                            if (!isSubscribed || isLiking) {
                                return
                            }
                            likePostMutation(post.id);
                        }}
                    />
                    <span className="text-xs text-zinc-400 tracking-tighter">
                        {post.likes}
                    </span>
                </div>

                <div className='flex gap-1 items-center'>
                    <Dialog>
                        <DialogTrigger>
                            <MessageCircle className='w-5 h-5 cursor-pointer' />
                        </DialogTrigger>
                        {isSubscribed && (
                            <DialogContent className='sm:max-w-106.25'>
                                <DialogHeader>
                                    <DialogTitle>Comments</DialogTitle>
                                </DialogHeader>
                                <ScrollArea className='h-100 w-87.5 rounded-md p-4'>
                                    {post.comments.map((comment) => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}

                                    {post.comments.length === 0 && (
                                        <div className='flex flex-col items-center justify-center h-full'>
                                            <p className='text-zinc-400'>No comments yet</p>
                                        </div>
                                    )}
                                </ScrollArea>

                                <form onSubmit={handleCommentSubmission}>
                                    <Input
                                        placeholder='Add a comment'
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />

                                    <DialogFooter>
                                        <Button type='submit' className='mt-4' disabled={isCommenting}>
                                            {isCommenting ? "Commenting..." : "Comment"}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        )}
                    </Dialog>

                    <div className="flex gap-1 items-center">
                        <span className="text-xs text-zinc-400 tracking-tighter">
                            {post.comments.length > 0 ? post.comments.length : 0}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post