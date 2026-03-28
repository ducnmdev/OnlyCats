import UnderlinedText from "@/components/decorators/UnderlinedText";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface IFeature {
    title: string;
    description: string;
    image: string;
}

const features: IFeature[] = [
    {
        title: "Expert Cat Care Tips",
        description:
            "Learn the best ways to keep your cats healthy and happy. From nutrition and grooming to playtime and daily care.",
        image: "/gifs/gif1.gif",
    },
    {
        title: "Play & Interaction Tips",
        description:
            "Improve how you play and bond with your cat through engaging activities. From interactive toys to fun daily routines, discover ideas in seconds.",
        image: "/gifs/gif2.gif",
    },
    {
        title: "Daily Cat Life",
        description: "Take a peek into our daily life with our cats, from feeding and playtime to cozy, relaxing moments.",
        image: "/gifs/gif3.gif",
    },
];

const featureList: string[] = [
    "Cat Health Insights",
    "Daily Tips",
    "Inside Our Cat Life",
    "Cat Training Tips",
    "Interactive Play Tips",
    "Cat Care Advice",
];

const Features = () => {
    return (
        <section className="container py-24 sm:py-32 space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
                Many <UnderlinedText className="underline-offset-8">OnlyCat</UnderlinedText> Features 🐈
            </h2>

            <div className="flex flex-wrap md:justify-center gap-4">
                {featureList.map((feature, index) => (
                    <div key={index}>
                        <Badge className="text-sm rounded-full" variant={'secondary'}>
                            {feature}
                        </Badge>
                    </div>
                ))}
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <Card key={index} className="flex flex-col">
                        <CardHeader>
                            <CardTitle>
                                {feature.title}
                            </CardTitle>
                        </CardHeader>

                        <CardContent>
                            {feature.description}
                        </CardContent>

                        <CardFooter className="mt-auto">
                            <img src={feature.image} alt="Feature Item"
                                className="rounded w-62.5 h-32 lg:w-75 mx-auto select-none pointer-events-none"
                            />
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default Features