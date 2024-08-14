import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { defaultThumbnail } from "../UserProfile/Tabs/UserFlows";
import Link from "next/link";
import ToggleBookmark from "./ToggleBookmark";
import { BlogWithUserAndTagsHome } from "@/types/BlogType";
import { UserCard } from "./Cards/UserCard";


type HomeFlowCardProps = {
  flow: BlogWithUserAndTagsHome;
  userBookmark: { id: string }[];
}

// TODO: Add top comment
const HomeFlowCard = ({ flow, userBookmark }: HomeFlowCardProps) => {

  if(!flow) return null;

  let isBookmarked = false;
  userBookmark.map((bookmark) => {
    if (bookmark.id === flow.id) isBookmarked = true;
  })

  return (
    <div className="border-2 rounded-lg m-10 p-4">
      <UserCard userData={flow.user} createdAt={flow.createdAt} flowId={flow.id} />
      <Card className="border-none">
        <div className="flex w-full">
          <CardHeader className="p-0">
            <Link href={`/blog/${flow.id}`}>
              <CardTitle className="font-bold line-clamp-2 text-lg px-2 pt-2">
                {flow.title}
              </CardTitle>
              <CardDescription className="px-2 w-full line-clamp-4">
                {flow.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, maiores itaque autem pariatur facilis tenetur, eius tempore ea dicta sapiente repudiandae dignissimos id et, cumque ab asperiores vel. Atque, reiciendis.
              </CardDescription>
            </Link>
          </CardHeader>
          {/* //TODO: Image */}
          <CardContent className="min-w-[250px] min-h-[150px] rounded-lg bg-blue-300 p-0 overflow-hidden">
            <div className="relative w-full h-full">
              <Image
                src={flow.thumbnail || defaultThumbnail}
                alt="Picture of the author"
                fill
                className="object-cover"
              />
            </div>
          </CardContent>
        </div>
        <CardDescription className="px-2">
          ye vo sb Discussed and Liked this
        </CardDescription>
        <CardFooter className="flex px-2 justify-between items-center">
          <div>Discuss . {flow.likeCount} Likes . {flow.noOfViews} reads</div>
          <div className="flex items-center">
            {
              flow.tags.map((tag: { tag: string }, key: number) => (
                <form key={key} method="GET" action="/">
                  <input type="hidden" name="search" value={tag.tag} />
                  <button type="submit">
                    <Badge variant="default" className="mr-2">{tag.tag}</Badge>
                  </button>
                </form>
              ))
            }
            <ToggleBookmark flowId={flow.id} isBookmarked={isBookmarked} />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default HomeFlowCard;
