import * as Icons from "lucide-react";

interface Props {
  className?: string;
  iconName: string; // 比如后端返回 "Activity" 或 "Bell"
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const DynamicIcon = ({
  className,
  style,
  iconName,
  size = 24,
  color,
}: Props) => {
  const Icon = Icons[iconName as keyof typeof Icons];

  if (!Icon) {
    return null; // 或者返回一个默认图标
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return <Icon style={style} className={className} size={size} color={color} />;
};

export default DynamicIcon;
