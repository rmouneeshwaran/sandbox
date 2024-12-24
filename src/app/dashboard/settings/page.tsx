import { Accordion, AccordionContent, AccordionTrigger } from "@/components/ui/accordion";
import { AccordionItem } from "@radix-ui/react-accordion";
import { Tally1 } from "lucide-react";
import Link from "next/link";

const Guidecenter: React.FC = () => {
  return <h1>Welcome to the Secure Dashboard Setting!
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Launchpad</AccordionTrigger>
        <AccordionContent>
          <li className="sidebar-item active">
            <Link href="/dashboard">
              <Tally1 size={18} />
              <span>Worksapce 1</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link href="/dashboard/guide-center">
              <Tally1 size={18} />
              <span>Worksapce 2</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link href="/dashboard/api-explorer">
              <Tally1 size={18} />
              <span>Workspace 3</span>
            </Link>
          </li>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </h1>;
};

export default Guidecenter;
