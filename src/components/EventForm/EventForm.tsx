import has from "lodash/has";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getInitEventValues,
  eventValidationSchema,
  getOccursMonthlyOptions,
  getRepeatIntervalOptions,
} from "./utils";
import { Checkbox, Input, Stack } from "@deskpro/deskpro-ui";
import { getOption } from "../../utils";
import { DAYS, DAY_NAMES } from "./constants";
import { Button, DateInput, Label, Select, TextArea } from "../common";
import { ErrorBlock } from "../Error";
import { AttendeesField } from "./fields";
import { Recurrence } from "./types";
import type { FC } from "react";
import type {
  EventFormProps,
  RecurrenceTypes,
  EventFormValidationSchema,
} from "./types";

const EventForm: FC<EventFormProps> = ({ onSubmit, onCancel, error }) => {
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

  const recurring = watch("recurring");
  const recurringType = watch("recurringType");
  const repeatInterval = watch("repeatInterval");
  const occursWeekly = watch("occursWeekly");
  const occursMonthly = watch("occursMonthly");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorBlock text={error} />}

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
          onChange={() => setValue("recurring", !recurring)}
        />
      </Label>

      {recurring && (
        <Label htmlFor="recurringType" label="Recurrence" required>
          <Select
            id="recurringType"
            value={recurringType}
            error={has(errors, ["recurringType", "message"])}
            options={[
              getOption<typeof Recurrence.DAILY>(Recurrence.DAILY, "Daily"),
              getOption<typeof Recurrence.WEEKLY>(Recurrence.WEEKLY, "Weekly"),
              getOption<typeof Recurrence.MONTHLY>(Recurrence.MONTHLY, "Monthly"),
            ]}
            onChange={(option) => setValue("recurringType", option.value)}
          />
        </Label>
      )}

      {recurring && (
        <Label htmlFor="repeatInterval" label="Repeat every" required>
          <Select
            id="repeatInterval"
            value={repeatInterval}
            error={has(errors, ["repeatInterval", "message"])}
            options={getRepeatIntervalOptions(recurringType as RecurrenceTypes)}
            onChange={(option) => setValue("repeatInterval", option.value)}
          />
        </Label>
      )}

      {recurring && (recurringType === Recurrence.DAILY) && (
        <Label htmlFor="dailyEndDatetime" label="End date" required>
          <DateInput
            id="dailyEndDatetime"
            placeholder="DD/MM/YYYY at HH:mm"
            error={has(errors, ["dailyEndDatetime", "message"])}
            onChange={(date) => setValue("dailyEndDatetime", date[0])}
          />
        </Label>
      )}

      {recurring && (recurringType === Recurrence.WEEKLY) && (
        <Label htmlFor="occursWeekly" label="Occurs on" required>
          <Select
            id="occursWeekly"
            value={occursWeekly}
            closeOnSelect={false}
            error={has(errors, ["occursWeekly", "message"])}
            options={Object.keys(DAYS).map((day) => ({
              ...getOption<number>(DAYS[day], DAY_NAMES[day]),
              description: day,
            }))}
            onChange={(o) => {
              if (o.value) {
                const selectedLabels = Array.isArray(occursWeekly)
                  ? occursWeekly
                  : [];
                const newValue = selectedLabels.includes(o.value)
                  ? selectedLabels.filter((name) => name !== o.value)
                  : [...selectedLabels, o.value];

                setValue("occursWeekly", newValue);
              }
            }}
          />
        </Label>
      )}

      {recurring && (recurringType === Recurrence.MONTHLY) && (
        <Label htmlFor="occursMonthly" label="Occurs on" required>
          <Select
            id="occursMonthly"
            value={occursMonthly}
            containerMaxHeight={350}
            placement="top"
            options={getOccursMonthlyOptions()}
            error={has(errors, ["occursMonthly", "message"])}
            onChange={(o) => setValue("occursMonthly", o.value)}
          />
        </Label>
      )}

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
