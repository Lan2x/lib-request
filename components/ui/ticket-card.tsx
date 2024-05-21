import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface TicketCardProps {
  title: string;
  content: string;
  bgColor?: string;
}

const TicketCard: React.FC<TicketCardProps> = ({ title, content, bgColor }) => {
  return (
    <div>
      <Card className={cn("w-[90px] md:w-[120px] mr-2", bgColor)}>
        <CardHeader className="flex items-center justify-center h-8 md:h-10">
          <CardTitle className="text-xs md:text-sm">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-5">
          <div className="text-sm md:text-lg">{content}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketCard;
