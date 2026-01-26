'use client'
import UnderlinedText from "@/components/decorators/UnderlinedText"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

const ContentTab = () => {
    const [text, setText] = useState('')
    const [mediaType, setMediaType] = useState<'video' | 'image'>('video')
    const [isPublic, setIsPublic] = useState<boolean>(false)
    const [mediaUrl, setMediaUrl] = useState<string>('')

    return (
        <>
            <p className="text-3xl my-5 font-bold text-center uppercase">
                <UnderlinedText className="decoration-wavy">Share</UnderlinedText> Post
            </p>

            <form>
                <Card className='w-full max-w-md mx-auto'>
                    <CardHeader>
                        <CardTitle className='text-2xl'>New Post</CardTitle>
                        <CardDescription>
                            Share your exclusive content with your audience. Select only one video/image at a time.
                        </CardDescription>
                    </CardHeader>

                    <CardContent className='grid gap-4'>
                        <div className='grid gap-2'>
                            <Label htmlFor='content'>Content</Label>
                            <Textarea
                                id='content'
                                placeholder="Share today's exclusive"
                                required
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>

                        <Label>Media Type</Label>

                        <RadioGroup
                            defaultValue='video'
                            value={mediaType}
                            onValueChange={(value: "image" | "video") => setMediaType(value)}
                        >
                            <div className='flex items-center'>
                                <RadioGroupItem value='video' id='video' />
                                <Label className="pl-2" htmlFor='video'>Video</Label>
                            </div>
                            <div className='flex items-center'>
                                <RadioGroupItem value='image' id='image' />
                                <Label className="pl-2" htmlFor='image'>Image</Label>
                            </div>
                        </RadioGroup>
                    </CardContent >
                </Card>
            </form>
        </>
    )
}
export default ContentTab