import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getInitEventValues, eventValidationSchema } from "./utils";
import { Input, Stack, Checkbox } from "@deskpro/deskpro-ui";
import { Label, Button, DateInput, TextArea } from "../common";
import { AttendeesField } from "./fields";
import type { FC } from "react";
import type { EventFormProps, EventFormValidationSchema } from "./types";

const EventForm: FC<EventFormProps> = ({ onSubmit, onCancel }) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormValidationSchema>({
    defaultValues: getInitEventValues(),
    resolver: zodResolver(eventValidationSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Label htmlFor="summary" label="Summary" required>
        <Input
          id="summary"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add Value"
          error={has(errors, ["summary", "message"])}
          value={watch("summary")}
          {...register("summary")}
        />
      </Label>

      <Label htmlFor="startTime" label="Start Date/time" required>
        <DateInput
          id="startTime"
          placeholder="DD/MM/YYYY at HH:mm"
          error={has(errors, ["startTime", "message"])}
          onChange={(date) => setValue("startTime", date[0])}
        />
      </Label>

      <Label htmlFor="endTime" label="End Date/time" required>
        <DateInput
          id="endTime"
          placeholder="DD/MM/YYYY at HH:mm"
          error={has(errors, ["endTime", "message"])}
          onChange={(date) => setValue("endTime", date[0])}
        />
      </Label>

      <Label htmlFor="description" label="Description">
        <TextArea
          variant="inline"
          id="description"
          minHeight="auto"
          placeholder="Enter description"
          value={watch("description")}
          error={has(errors, ["description", "message"])}
          {...register("description")}
        />
      </Label>

      <Label htmlFor="location" label="Location">
        <Input
          id="location"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add Value"
          error={has(errors, ["location", "message"])}
          value={watch("location")}
          {...register("location")}
        />
      </Label>

      <Label htmlFor="attendees" label="Attendees">
        <AttendeesField
          id="attendees"
          value={watch("attendees")}
          error={has(errors, ["attendees", "message"])}
          onChange={(attendees) => setValue("attendees", attendees)}
        />
      </Label>

      <Label htmlFor="recurring" label="Frequency">
        <Checkbox
          id="recurring"
          label="Recurring"
          checked={watch("recurring")}
          onChange={() => setValue("recurring", !watch("recurring"))}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="submit"
          text="Add"
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button
          type="button"
          text="Cancel"
          intent="tertiary"
          onClick={onCancel}
        />
      </Stack>
    </form>
  );
};

export { EventForm };
