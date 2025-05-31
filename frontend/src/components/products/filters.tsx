import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import AuthorsList from "./authors-list";
import DateTimePicker from "./date-time-picker";
import StatusList from "./status-list";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";
import { Button } from "../ui/button";
import { Funnel } from "lucide-react";

const Filters = () => {
  const [open, setOpen] = useState(false);
  const { isMobile } = useIsMobile();
  const filterFields = [
    {
      filterName: "Time",
      component: DateTimePicker,
    },
    {
      filterName: "Status",
      component: StatusList,
    },
    {
      filterName: "Author",
      component: AuthorsList,
    },
  ];

  if (!isMobile) {
    return (
      <Accordion type="multiple">
        {filterFields.map((field) => (
          <AccordionItem value={field.filterName} key={field.filterName}>
            <AccordionTrigger>{field.filterName}</AccordionTrigger>
            <AccordionContent>
              <field.component id={field.filterName.toLowerCase()} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  }

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="mb-4">
            <Funnel />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-4">
          <DrawerHeader className="text-left">
            <DrawerTitle>Apply filters</DrawerTitle>
          </DrawerHeader>
          <Accordion type="multiple">
            {filterFields.map((field) => (
              <AccordionItem value={field.filterName} key={field.filterName}>
                <AccordionTrigger>{field.filterName}</AccordionTrigger>
                <AccordionContent>
                  <field.component id={field.filterName.toLowerCase()} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <DrawerFooter className="pt-2">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }
};

export default Filters;
