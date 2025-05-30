import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import AuthorsList from "./authors-list";
import DateTimePicker from "./date-time-picker";
import StatusList from "./status-list";

const Filters = () => {
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
};

export default Filters;
