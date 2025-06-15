"use client";

import { ComponentProps, useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import Render from "./render";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "../lib/utils";

type Props = Omit<ComponentProps<"input">, "type">;

const iconClassName = "w-5 h-5";

function PasswordInput({ className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex items-center gap-x-2">
      <Input
        type={showPassword ? "text" : "password"}
        {...props}
        className={cn(className)}
      />
      <Button
        onClick={() => setShowPassword((prev) => !prev)}
        type="button"
        size="sm"
        variant="secondary"
      >
        <Render condition={showPassword}>
          <Eye className={cn(iconClassName)} />
        </Render>
        <Render condition={!showPassword}>
          <EyeOff className={cn(iconClassName)} />
        </Render>
      </Button>
    </div>
  );
}

export { PasswordInput };
