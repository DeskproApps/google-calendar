import { useState, useCallback } from "react";
import concat from "lodash/concat";
import { z } from "zod";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import get from "lodash/get";
import { Stack, Input, IconButton, RoundedLabelTag } from "@deskpro/deskpro-ui";
import { useDeskproAppTheme } from "@deskpro/app-sdk";
import type { FC, KeyboardEvent } from "react";
import type { AnyIcon } from "@deskpro/deskpro-ui";

type Props = {
  id: string,
  error: boolean,
  value: string[],
  onChange: (attendees: string[]) => void,
};

const AttendeesField: FC<Props> = ({ error, onChange, value }) => {
  const { theme } = useDeskproAppTheme();
  const [isError, setIsError] = useState<boolean>();
  const [input, setInput] = useState<string>();

  const onClearInput = useCallback(() => setInput(""), []);

  const onRemove = useCallback((removeEmail: string) => {
    onChange((Array.isArray(value) ? value : []).filter((email) => removeEmail !== email));
  }, [value, onChange]);

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    setIsError(false);

    if (e.key === "Enter") {
      e.preventDefault();
      const emailSchema = z.string().email();
      const email = get(e, ["target", "value"]);

      try {
        emailSchema.parse(email);
        onChange(Array.isArray(value) ? concat(value, email) : [email]);
        setInput("");
      } catch (error) {
        setIsError(true);
      }
    }
  };

  return (
    <>
      <Stack gap={6} wrap="wrap">
        {Array.isArray(value) && value.map((email) => (
          <RoundedLabelTag
            withClose
            key={email}
            backgroundColor={theme.colors.grey10}
            label={email}
            closeIcon={faClose as AnyIcon}
            onCloseClick={() => onRemove(email)}
          />
        ))}
      </Stack>
      <Input
        type="text"
        value={input}
        variant="inline"
        inputsize="small"
        error={isError || error}
        placeholder="Enter email"
        onKeyDown={onKeyDownEnter}
        style={{ paddingRight: 0 }}
        onChange={(e) => setInput(e.target.value)}
        rightIcon={(
          <IconButton minimal onClick={onClearInput} icon={faClose as AnyIcon} />
        )}
      />
    </>
  );
};

export { AttendeesField };
