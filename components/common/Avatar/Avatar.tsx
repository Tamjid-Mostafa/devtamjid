"use client";
import { FC, useRef, useEffect } from "react";
import { useUserAvatar } from "@/lib/hooks/useUserAvatar";

interface Props {
  className?: string;
  children?: any;
}

const Avatar: FC<Props> = ({}) => {
  let ref = useRef() as React.MutableRefObject<HTMLInputElement>;
  let { userAvatar } = useUserAvatar();

  return (
    <div
      ref={ref}
      style={userAvatar ? { backgroundImage: userAvatar } : undefined}
      className="border-primary hover:border-secondary focus:border-secondary inline-block h-8 w-8 rounded-full border-2 transition-colors ease-linear">
      {/* Add an image - We're generating a gradient as placeholder  <img></img> */}
    </div>
  );
};

export default Avatar;
