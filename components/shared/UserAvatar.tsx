import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Props = {
  src?: string;
  className?: string;
};

function UserAvatar({ src, className }: Props) {
  return (
    <Avatar className={`h-7 w-7 md:h-10 md:w-10 ${className}`}>
      <AvatarImage src={src} />
    </Avatar>
  );
}

export default UserAvatar;
