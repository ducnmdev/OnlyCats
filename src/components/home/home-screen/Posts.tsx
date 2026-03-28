import UnderlinedText from "@/components/decorators/UnderlinedText"
import Post from "./Post"
import PostSkeleton from "@/components/skeletons/PostSkeleton"
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "@/lib/api/post";
import { PostType } from "@/types/post";
import { adminI } from "@/types/user";

const Posts = ({ isSubscribed, admin }: { isSubscribed: boolean, admin: adminI }) => {
    const { data: posts, isLoading } = useQuery<PostType[]>({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    return (
        <div>

            {!isLoading && posts?.map(post => (
                <Post key={post.id} post={post} admin={admin} isSubscribed={isSubscribed} />
            ))}

            {isLoading && (
                <div className="mt-10 px-3 flex flex-col gap-10">
                    {[...Array(3)].map((_, index) => (
                        <PostSkeleton key={index} />
                    ))}
                </div>
            )}

            {!isLoading && posts?.length === 0 && (
                <div className="mt-10 px-3">
                    <div className="flex flex-col items-center space-y-3 w-full md:w-3/4 mx-auto">
                        <p className="text-lg font-semibold">
                            No Post <UnderlinedText>Yet</UnderlinedText>
                        </p>

                        <p className="text-center">
                            Stay tuned for more posts from
                            <span className="text-primary font-semibold text-xl"> OnlyCat</span>. You can subscribe to access
                            exclusive content when it's available.
                        </p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Posts