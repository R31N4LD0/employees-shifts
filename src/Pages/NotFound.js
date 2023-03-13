import React, { useEffect, useState } from "react";
import { IconMoon, IconSunrise, IconSunHigh, IconForbid2 } from "@tabler/icons-react";
import { Stack, Title } from "@mantine/core";

const NotFound = () => {
  const tmp = "Not Found";

  return (
    <Stack align="center" justify="flex-start" h={300}>
      <IconForbid2 size="30rem" />
      <Title order={1}>Page Not Found</Title>
    </Stack>
  );
};

export default NotFound;