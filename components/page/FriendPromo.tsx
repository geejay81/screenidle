import { Friend } from "@/types/Friend";
import Image from "next/image";
import Link from "next/link";

export default function FriendPromo(friend: Friend) {

    return (
        <div className="bg-white rounded-lg">
            <Link href={friend.linkUrl} target="_blank">
                <Image className="rounded-t-lg" src={friend.imageUrl} alt="" width={400} height={200} />
            </Link>
            <div className="p-5 space-y-4">
                <Link href={friend.linkUrl} target="_blank">
                    <h2 className="mb-2 text-xl md:text-2xl font-bold tracking-tight text-gray-900">{friend.title}</h2>
                </Link>
                <p className="font-normal text-gray-700">{friend.description}</p>
                <div className="mb-4">
                    <Link href={friend.linkUrl} target="_blank">
                        <span className="px-4 py-2 font-medium text-screenidle-link bg-screenidle-success border-2 border-screenidle-link rounded-lg">Play</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}