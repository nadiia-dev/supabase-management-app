import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>
          Invite your team members to collaborate.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {members.map((member) => (
          <div key={member.id} className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Avatar className="h-8 w-8 rounded-full">
                <AvatarImage src={`${member.avatar_url}`} alt="user avatar" />
                <AvatarFallback>
                  {member.full_name
                    ? member.full_name.slice(2)
                    : member.email.slice(2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-md">{member.full_name}</p>
                <p className="text-sm text-stone-400">{member.email}</p>
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
