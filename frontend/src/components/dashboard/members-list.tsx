import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { User2 } from "lucide-react";

interface Member {
  id: string;
  avatar_url: string;
  email: string;
  full_name?: string;
}

interface Props {
  members: Member[];
  ownerId: string;
}

const MembersList = ({ members, ownerId }: Props) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {members.map((member) => (
          <div
            key={member.id}
            className="flex justify-between items-center gap-2 mb-3 flex-wrap"
          >
            <div className="flex gap-2 items-center">
              {member.avatar_url ? (
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarImage src={`${member.avatar_url}`} alt="user avatar" />
                </Avatar>
              ) : (
                <User2 />
              )}
              <div>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-md">
                  {member.full_name}
                </p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-stone-400">
                  {member.email}
                </p>
              </div>
            </div>
            <div className="bg-stone-300 rounded-full px-2 py-1">
              {member.id === ownerId ? "Owner" : "Member"}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MembersList;
