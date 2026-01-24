import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { user } from "@/dummy_data"
import { Trash } from "lucide-react"
import Image from "next/image"

const Post = ({ post, admin, isSubscribed }: { post: any, admin: any, isSubscribed: boolean }) => {
    return (
        <div className="flex flex-col gap-3 p-3 border-t">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage src={admin.image || "/user-placeholder.png"} />
                        <AvatarFallback>MN</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-sm md:text-md">{admin.name}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <p className="text-zinc-400 text-xs md:text-sm tracking-tighter">
                        17.06.2024
                    </p>

                    {admin.id === user.id && (
                        <Trash className="w-5 h-6 text-muted-foreground hover:text-red-500 cursor-pointer" />
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

            {/* {(post.isPublic || isSubscribed) && post.mediaUrl && post.mediaType === 'video' && ()} */}
        </div>
    )
}

export default Post